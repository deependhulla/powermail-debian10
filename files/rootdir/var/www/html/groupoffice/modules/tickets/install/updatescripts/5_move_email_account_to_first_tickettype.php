<?php

$settings = \GO\Tickets\Model\Settings::model()->findModel();

if($settings->email_account_id) {

	echo "Email account found in the ticket settings.\n";
	echo "Account id: ".$settings->email_account_id."\n";
	
	$defaultType = \GO\Tickets\Model\Type::model()->findSingle(\GO\Base\Db\FindParams::newInstance()->ignoreAcl(false)->order('name'));
	
	if($defaultType){
		$defaultType->email_account_id = $settings->email_account_id;
		$defaultType->save();
		echo "Moved to default type: ".$defaultType->name."\n";
	}
}

?>
