<?php

namespace GO\Savemailas;

use GO;
use GO\Base\Db\ActiveRecord;
use GO\Base\Model\Acl as Acl2;
use go\core\model\Acl;
use go\core\model\Link;
use go\core\model\User;
use go\core\orm\EntityType;
use go\core\orm\Property;
use go\core\orm\Query;
use go\modules\community\addressbook\model\Contact;
use GO\Professional\Module;


class SavemailasModule extends Module{
	
	public function depends()
	{
		return array('email');
	}
	
	public function autoInstall() {
		return true;
	}

	public function defineListeners() {
		Link::on(Link::EVENT_BEFORE_DELETE, static::class, 'onLinkDelete');
	}

	/**
	 * Because we've implemented the getter method "getOrganizationIds" the contact
	 * modSeq must be incremented when a link between two contacts is deleted or
	 * created.
	 *
	 * @param Link $link
	 */
	public static function onLinkDelete(Query $links) {

		$emailTypeId = \GO\Savemailas\Model\LinkedEmail::entityType()->getId();
		$query = clone $links;

		$query->andWhere('(toEntityTypeId = :e1 OR fromEntityTypeId = :e2)')->bind([':e1'=> $emailTypeId, ':e2'=> $emailTypeId]);

		$emailLinks = Link::find()->mergeWith($query);

		foreach($emailLinks as $link) {

			$emails = [];
			if($link->getToEntity() == "LinkedEmail") {
				$emails[] = $link->toId;
			}

			if($link->getFromEntity() == "LinkedEmail") {
				$emails[] = $link->fromId;
			}

			foreach($emails as $id) {
				$linkedEmail = GO\Savemailas\Model\LinkedEmail::model()->findByPk($id);
				if($linkedEmail->countLinks() == 1) {
					$linkedEmail->delete(true);
				}
			}
		}

	}


	/**
	 * 
	 * @param string $entity
	 * @return EntityType
	 */
	public static function getLinkModel($modelName, $modelId) {
		
		//make it backwards compatible with old classnames. Strip off the namespace.
		
		$parts = explode("\\", $modelName);
		$entity = array_pop($parts);
		
		$entityType = EntityType::findByName($entity);
		
		if(!$entityType) {
			return false;
		}
		
		$cls = $entityType->getClassName();
		if(is_a($cls, ActiveRecord::class, true)) {
		
			$model = GO::getModel($cls)->findByPk($modelId, false, true);
			if(!$model || !$model->checkPermissionLevel(Acl2::WRITE_PERMISSION)) {
				return false;
			}	
		} else
		{
			//must be a go\core\orm\Entity (new)			
			$model = $cls::findById($modelId);
			if(!$model || !$model->hasPermissionLevel(Acl::LEVEL_WRITE)) {
				return false;
			}
			
		}
		
		return $model;
	}
}
