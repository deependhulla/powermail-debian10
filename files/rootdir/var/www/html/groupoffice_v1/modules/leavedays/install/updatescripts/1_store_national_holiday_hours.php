<?php
$oldAclPermission = \GO::setIgnoreAclPermissions(true);
$leavedaysStmt = \GO\Leavedays\Model\Leaveday::model()->find();
foreach ($leavedaysStmt as $leavedayModel) {
	$leavedayModel->n_nat_holiday_hours = $leavedayModel->calcBookedNationalHolidayHours();
	$leavedayModel->save();
}
\GO::setIgnoreAclPermissions($oldAclPermission);
