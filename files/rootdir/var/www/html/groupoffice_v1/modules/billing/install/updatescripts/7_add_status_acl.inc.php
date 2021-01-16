<?php

$statuses = \GO::getDbConnection()->query('SELECT id FROM bs_order_statuses')->fetchAll();
foreach ($statuses as $status) {	
	
	$acl = new \GO\Base\Model\Acl();
	$acl->description = 'order_statuses';
	$acl->save();

	\GO::getDbConnection()->query('UPDATE bs_order_statuses SET acl_id='.$acl->id.' WHERE id = ' . $status['id']);
	
	$acl->addGroup(\GO::config()->group_everyone);
}
