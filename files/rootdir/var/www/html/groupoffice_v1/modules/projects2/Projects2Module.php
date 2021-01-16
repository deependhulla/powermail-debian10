<?php


namespace GO\Projects2;

use Exception;
use GO;
use GO\Base\Db\FindCriteria;
use GO\Base\Db\FindParams;
use GO\Base\Db\Utils;
use GO\Base\Fs\Folder;
use GO\Base\Fs\File;
use go\core\db\Criteria;
use go\core\model\EntityFilter;
use go\core\orm\Filters;
use go\core\orm\Query;
use go\modules\community\addressbook\model\Contact;
use GO\Projects2\Model\Project;
use GO\Projects2\Model\Status;
use GO\Projects2\Model\Template;
use GO\Projects2\Model\Type;
use PDO;





class Projects2Module extends \GO\Professional\Module {
	
	const FINANCE_PERMISSIONS = 45;

	public function appCenter(){
		return true;
	}
	
	/**
	 * Add the project manager notify email job to the cron controller
	 */
	public static function initListeners() {
		
		if(GO::modules()->isInstalled('files') && class_exists('\GO\Files\Controller\FolderController')){
			$folderController = new \GO\Files\Controller\FolderController();
			$folderController->addListener('checkmodelfolder', "GO\Projects2\Projects2Module", "createParentFolders");
		}
		
		\GO\Base\Model\User::model()->addListener('delete', "GO\Projects2\Projects2Module", "deleteUser");

	}

	public static function defineListeners() {
		// Add contact filter
		Contact::on(Contact::EVENT_FILTER, static::class, 'onContactFilter');
	}

	public static function onContactFilter(Filters $filters) {
		$filters->add('projectfilterid', function(Criteria $criteria, $value, Query $query) {
			$entityFilter = EntityFilter::findById($value);
			$query = \GO\Projects2\Model\ProjectEntity::find(['id'])
				->selectSingleValue('p.contact_id')
				->filter($entityFilter->getFilter());

			$criteria->Where('c.id', 'IN', $query);
		});
	}
	
	/**
	 * When a folder is created for a project we must attach the parent folders 
	 * to the projects as well.
	 * 
	 * @param \GO\Projects2\Model\Folder  $model
	 * @param \GO\Files\Model\Folder $folder
	 */
	public static function createParentFolders($model, $folder, $newFolder){
		
		if($newFolder && is_a($model, "GO\Projects2\Model\Project")){
			if($project = $model->parent()){
				GO::debug("Checking folder: ".$project->path);
				
				$folderController = new \GO\Files\Controller\FolderController();				
				$folderController->checkModelFolder($project, true, true);
			}
		}
		
	}
	

	public function autoInstall() {
		return true;
	}

	public function install() {
		
		// Install the notification cron for income contracts
		\GO\Projects2\Projects2Module::createDefaultIncomeContractNotificationCron();

		parent::install();

		$defaultType = new Type();
		$defaultType->name = GO::t("Default");
		$defaultType->save();

		$defaultStatus = new Status();
		$defaultStatus->name = GO::t("Ongoing", "projects2");
		$defaultStatus->show_in_tree=true;
		$defaultStatus->save();

		$noneStatus = new Status();
		$noneStatus->name = GO::t("None", "projects2");
		$noneStatus->show_in_tree=true;
		$noneStatus->filterable=true;
		$noneStatus->save();

		$status = new Status();
		$status->name = GO::t("Complete", "projects2");
		$status->complete=true;
		$status->show_in_tree=false;
		$status->save();


		$folder = new \GO\Base\Fs\Folder(GO::config()->file_storage_path.'projects2/template-icons');
		$folder->create();

		if(!$folder->child('folder.png')){
			$file = new \GO\Base\Fs\File(GO::modules()->projects2->path . 'install/images/folder.png');
			$file->copy($folder);
		}


		if(!$folder->child('project.png')){
			$file = new \GO\Base\Fs\File(GO::modules()->projects2->path . 'install/images/project.png');
			$file->copy($folder);
		}

		$template = new Template();
		$template->name = GO::t("Projects folder", "projects2");
		$template->name_template = "";
		$template->default_status_id = $noneStatus->id;
		$template->default_type_id = $defaultType->id;
		$template->icon=$folder->stripFileStoragePath().'/folder.png';
		$template->project_type=Template::PROJECT_TYPE_CONTAINER;
    $template->show_in_tree=true;
		$template->save();

		$template->acl->addGroup(GO::config()->group_everyone);


		$template = new Template();
		$template->name = GO::t("Standard project", "projects2");
		$template->name_template = "";
		$template->default_status_id = $defaultStatus->id;
		$template->default_type_id = $defaultType->id;
		$template->project_type=Template::PROJECT_TYPE_PROJECT;
		$template->fields = 'responsible_user_id,status_date,customer,budget_fees,contact,expenses';
		$template->icon=$folder->stripFileStoragePath().'/project.png';
		$template->save();

		$template->acl->addGroup(GO::config()->group_everyone);
	}

	/**
	 * Get the user this time entry is for based on a session that is set
	 * If the logged in user is no manger always return itself
	 * 
	 * @return int
	 */
	public static function getActiveTimeregistrationUserId() {

		if (GO::user()->getModulePermissionLevel('timeregistration2') == \GO\Base\Model\Acl::MANAGE_PERMISSION && !empty(GO::session()->values['tr_active_user']))
			return GO::session()->values['tr_active_user'];
		else
			return GO::user()->id;
	}

	/**
	 * Create the default notification cronjob for income contracts
	 */
	public static function createDefaultIncomeContractNotificationCron(){
		
			$cron = new \GO\Base\Cron\CronJob();
		
			$cron->name = GO::t("Contract Expiry Notification Cron", "projects2");
			$cron->active = true;
			$cron->runonce = false;
			$cron->minutes = '2';
			$cron->hours = '7';
			$cron->monthdays = '*';
			$cron->months = '*';
			$cron->weekdays = '*';
			$cron->job = 'GO\Projects2\Cron\IncomeNotification';

			return $cron->save();
	}
	
	
	public static function deleteUser($user){
		
		Model\Employee::model()->deleteByAttribute('user_id', $user->id);
		Model\Resource::model()->deleteByAttribute('user_id', $user->id);
		Model\DefaultResource::model()->deleteByAttribute('user_id', $user->id);
	}
	
	public function checkDatabase(&$response) {
		
//		$sql = "update fs_folders set readonly = 0, acl_id = 0 where id in (
//
//			select id from (select id,parent_id from fs_folders order by parent_id, id) sort, (select @pv := '36') initialisation where find_in_set(parent_id, @pv) > 0 and @pv := concat(@pv, ',', id)
//    
//    )
//    
//    
//    and
//    
//    id  not in (
//        
//        select files_folder_id from pr2_projects
//        
//        )
//        
//        and readonly = 1;";

		
		return parent::checkDatabase($response);
	}
}
