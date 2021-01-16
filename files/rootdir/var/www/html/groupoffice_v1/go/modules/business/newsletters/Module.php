<?php
namespace go\modules\business\newsletters;

use go\core;
use go\core\App;
use go\core\cron\GarbageCollection;
use \go\core\model;
use go\core\db\Criteria;
use go\core\orm\Filters;
use go\core\orm\Query;
use go\modules\community\addressbook\convert\Csv;
use go\modules\community\addressbook\model\Contact;
use go\core\model\CronJobSchedule;
use go\core\model\EmailTemplate;
use go\modules\business\newsletters\model\AddressList;
use go\modules\business\newsletters\model\AddressListEntity;
use go\modules\community\addressbook\install\Migrate63to64;
use go\core\orm\Mapping;

/**			
 * 
 * //SELECT subject, from_unixtime(m.ctime), message_path, a.name as list FROM `ab_sent_mailings` m inner join ab_addresslists a on a.id=m.addresslist_id WHERE 1

 * 			
 * @copyright (c) 2019, Intermesh BV http://www.intermesh.nl
 * @author Merijn Schering <mschering@intermesh.nl>
 * @license http://www.gnu.org/licenses/agpl-3.0.html AGPLv3
 */
class Module extends core\Module {
							
	public function getAuthor() {
		return "Intermesh BV <info@intermesh.nl>";
	}


	public function requiredLicense()
	{
		return 'groupoffice-pro';
	}
	
	
	public function defineListeners() {
		Contact::on(Contact::EVENT_FILTER, static::class, 'onContactFilter');		
		Contact::on(Contact::EVENT_DELETE, static::class, 'onContactDelete');
		Contact::on(Contact::EVENT_MAPPING, static::class, 'onMap');

		model\User::on(model\User::EVENT_FILTER, static::class, 'onUserFilter');

		Csv::on(Csv::EVENT_INIT, static::class, 'onCsvInit');
		GarbageCollection::on(GarbageCollection::EVENT_RUN, static::class, 'onGarbageCollect');
	}

	public static function onMap(Mapping $mapping) {
		$mapping->addMap('addressLists', AddressListEntity::class, ['id' => 'entityId']);
	}

	public static function onGarbageCollect() {		
		$stmt = go()->getDbConnection()->delete(
			'newsletters_address_list_entity', 
			(new Query)
				->tableAlias('e')
				->join("newsletters_address_list", "l", 'l.id = e.addressListId')
				->where('l.entityTypeId', '=', Contact::entityType()->getId())
				->andWhere('e.entityId', 'NOT IN', go()->getDbConnection()->select('id')->from('addressbook_contact')
			)
		);
		// echo $stmt ." \n";
		$stmt->execute();
	}
	
	public static function onContactDelete(Query $contacts) {
		go()->getDbConnection()->delete(
			'newsletters_address_list_entity', 
			(new Query())
				->join('newsletters_address_list', 'list', 'list.id = t.addressListId')
				->where(['entityId' => $contacts, 'list.entityTypeId' => Contact::entityType()->getId()])
			);
	}

	private static $joinCounter = 0;
	/**
	 * Extends the User filters with "isIntermediair". So we can show only
	 * users that are being an intermediair.
	 * 
	 * @param Filters $filters
	 */
	public static function onContactFilter(Filters $filters) {		
		$filters->add('addressListId', function(Criteria $criteria, $value, Query $query) {

			//For empty arrays
			if(empty($value)) {
				return;
			}

			$alias = 'addresslist_' . (static::$joinCounter++);
			$on = new Criteria();
			$on->where($alias . '.entityId = c.id')->andWhere([$alias.".addressListId" => $value]);

			$query->join('newsletters_address_list_entity', $alias, $on, 'LEFT');
			$criteria->where($alias.'.entityId IS NOT NULL');
		});
	}

	/**
	 * Extends the User filters with "isIntermediair". So we can show only
	 * users that are being an intermediair.
	 *
	 * @param Filters $filters
	 */
	public static function onUserFilter(Filters $filters) {
		$filters->add('addressListId', function(Criteria $criteria, $value, Query $query) {

			//For empty arrays
			if(empty($value)) {
				return;
			}

			$alias = 'addresslist_' . (static::$joinCounter++);
			$on = new Criteria();
			$on->where($alias . '.entityId = u.id')->andWhere([$alias.".addressListId" => $value]);

			$query->join('newsletters_address_list_entity', $alias, $on, 'LEFT');
			$criteria->where($alias.'.entityId IS NOT NULL');
		});
	}

	protected function afterInstall(model\Module $model)
	{
		$cron = new CronJobSchedule();
		$cron->moduleId = $model->id;
		$cron->name = "Mailer";
		$cron->expression = "* * * * *";
		$cron->description = "Newsletter mailer";
		
		if(!$cron->save()) {
			throw new \Exception("Failed to save cron job: " . var_export($cron->getValidationErrors(), true));
		}


		$template = new EmailTemplate();
		$template->name = go()->t("Default");
		$template->setModule($model->id);
		$template->subject = "Hi {{contact.firstName}}";
		$template->body = "Dear [if {{contact.prefixes}}]{{contact.prefixes}}[else][if !{{contact.gender}}]Ms./Mr.[else][if {{contact.gender}}==\"M\"]Mr.[else]Ms.[/if][/if][/if] {{contact.lastName}},<div><div><br></div><div><br></div><div>Best regards,</div><div><br></div><div>{{creator.displayName}}</div></div><div>{{creator.profile.organizations[0].name}}</div><div><br /></div><div><a href=\"{{unsubscribeUrl}}\">unsubscribe</a></div>";
		if(!$template->save()) {
			throw new \Exception("Failed to save template: " . var_export($template->getValidationErrors(), true));
		}

		return $this->migrateAddressLists();

	}

	private function migrateAddressLists() {

		if(!go()->getDatabase()->hasTable('ab_addresslists')){
			return true;
		}

		$abMig = new Migrate63to64();
		$companyIdIncrement = $abMig->getCompanyIdIncrement();

		go()->getDbConnection()->exec("insert into `newsletters_address_list` select id, (select id from core_entity where clientName='Contact'),acl_id,name from ab_addresslists;");

		$lists = AddressList::find();
		foreach($lists as $list) {
			foreach(go()->getDbConnection()->select()->from('ab_addresslist_contacts')->where('addresslist_id', '=', $list->id) as $r) {
				$list->entities[] = (new AddressListEntity())->setValue('entityId', $r['contact_id']);
			}

			foreach(go()->getDbConnection()->select()->from('ab_addresslist_companies')->where('addresslist_id', '=', $list->id) as $r) {
				$list->entities[] = (new AddressListEntity())->setValue('entityId', $r['company_id'] + $companyIdIncrement);
			}
			if(!$list->save()) {
				return false;
			}
		}

		return true;
		
	}


	public static function onCsvInit(Csv $csv) {
		$csv->addColumn('addressLists',
			go()->t("Adddress Lists", 'business', 'newsletters'),

			function (Contact $contact) {
				$names = [];
				if(isset($contact->addressLists)) {
					foreach ($contact->addressLists as $listId => $map) {
						$list = AddressList::findById($listId);
						$names[] = $list->name;
					}
				}

				return implode(Csv::$multipleDelimiter, $names);
			},

		  function (Contact $contact, $lists) {
				if(empty($lists)) {
					return;
				}

			  $lists = explode(Csv::$multipleDelimiter, $lists);

			  $importedListIds = [];
				foreach($lists as $listName) {
					$list = AddressList::find()->where(['name' => $listName])->filter(['permissionLevel' => model\Acl::LEVEL_WRITE])->single();
					if(!$list) {
						$list = new AddressList();
						$list->name = $listName;
						$list->setEntity("Contact");
						if(!$list->save()) {
							throw new Exception("Could not create list");
						}
					}
					if(!isset($contact->addressLists[$list->id])) {
						$contact->addressLists[$list->id] = (new AddressListEntity())->setValues(['addressListId' => $list->id, 'entityId' => $contact->id]);
					}
					$importedListIds[] = $list->id;
				}


				//remove lists if you have the permission
			  foreach($contact->addressLists as $id => $entity) {
			  	if(!in_array($id, $importedListIds)) {
			  		$list = AddressList::findById($id);
			  		if($list->getPermissionLevel() >= model\Acl::LEVEL_WRITE) {
			  			$contact->addressLists[$id] = null;
					  }
				  }
			  }

			});
	}
							
}