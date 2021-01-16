<?php

namespace GO\Leavedays;

use Exception;
use GO;
use GO\Base\Model\Acl;
use GO\Base\Model\User;
use GO\Leavedays\Model\Leaveday;
use GO\Leavedays\Model\YearCredit;
use GO\Professional\Module;
use GO\Users\Controller\UserController;


class LeavedaysModule extends Module{
	
	public function autoInstall() {
		return true;
	}

	
	public static function userHasPermission($userId) {
		
		$level = Acl::getUserPermissionLevel(GO::modules()->leavedays->acl_id, $userId);
						
		
		return $level >= Acl::READ_PERMISSION;
		
	}
	
	public function install() {
		
		parent::install();
		
		
		$name = \GO::t("Holidays", "leavedays");
		
		// add default credit types add id 1
		$sql = "INSERT INTO `ld_credit_types` (`id`, `name`, `description`, `credit_doesnt_expired`, `sort_index`) VALUES (1, '". $name ."', '". $name ."', '1', '1');";
//		echo $sql."\n";

		\GO::getDbConnection()->query($sql);
		
	}
	
}
