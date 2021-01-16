<?php

	$projectStatuses = \GO\Projects2\Model\Status::model()->find(\GO\Base\Db\FindParams::newInstance()->ignoreAcl());
//	
//	//All existing statuses get an acl with read permissions for everyone
	foreach($projectStatuses as $status) {
		
		echo "Sharing ".$status->name."\n";
		$acl = $status->setNewAcl(1);
		$acl->addGroup(\GO::config()->group_everyone, \GO\Base\Model\Acl::READ_PERMISSION);
		$status->save(true);
	}
	
