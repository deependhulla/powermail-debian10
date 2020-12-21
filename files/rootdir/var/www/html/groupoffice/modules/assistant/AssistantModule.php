<?php

namespace GO\Assistant;


class AssistantModule extends \GO\Professional\Module{
	public function hasInterface() {
		return false;
	}
	public function autoInstall() {
		return true;
	}

	public function install()
	{
		if(!parent::install()) {
			return false;
		}

		if(\GO::modules()->files) {
			\go()->getDbConnection()->exec("TRUNCATE `fs_filehandlers`;");
		}

		return true;
	}
}
