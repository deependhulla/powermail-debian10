<?php

namespace GO\Documenttemplates;

use GO;
use GO\Base\Model\Template;
use GO\Professional\Module;


class DocumenttemplatesModule extends Module{
	public function autoInstall() {
		return true;
	}
	
	public function install() {
		if(!parent::install()) {
			return false;
		}
		
		$dt = Template::model()->findSingleByAttribute('name', 'Letter');
		if (!$dt) {
			$dt = new Template();	
			$dt->type = Template::TYPE_DOCUMENT;
			$dt->content = file_get_contents(GO::modules()->documenttemplates->path . 'install/letter_template.docx');
			$dt->extension = 'docx';
			$dt->name = 'Letter';
			$dt->save();
			
			$dt->acl->addGroup(GO::config()->group_internal);
		}
		
		return true;
	}
}
