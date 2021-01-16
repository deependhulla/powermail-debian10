<?php
$oldAclPermission = \GO::setIgnoreAclPermissions(true);
$templatesStmt = \GO\Projects2\Model\Template::model()->find();
foreach ($templatesStmt as $templateModel) {
	$fieldsArray = explode(',',$templateModel->fields);
	if (!in_array('tasks_panel',$fieldsArray))
		$fieldsArray[] = 'tasks_panel';
	foreach ($fieldsArray as $k=>$fieldString) {
		if (empty($fieldString))
			unset($fieldsArray[$k]);
	}
	$templateModel->fields = implode(',',$fieldsArray);
	$templateModel->save();
}
\GO::setIgnoreAclPermissions($oldAclPermission);
