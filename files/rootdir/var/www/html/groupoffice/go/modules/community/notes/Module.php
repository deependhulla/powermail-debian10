<?php
namespace go\modules\community\notes;

use go\core;
use go\core\model\User;
use go\core\model\Acl;
use go\core\model\Group;
use go\core\model\Module as ModuleModel;
use go\core\orm\Mapping;
use go\core\orm\Property;
use go\modules\community\notes\model\NoteBook;
use go\modules\community\notes\model\UserSettings;

class Module extends core\Module {	

	public function getAuthor() {
		return "Intermesh BV";
	}

	
	protected function afterInstall(ModuleModel $model) {	
		
		$noteBook = new NoteBook();
		$noteBook->name = go()->t("Shared");
		$noteBook->setAcl([
			Group::ID_INTERNAL => Acl::LEVEL_DELETE
		]);
		$noteBook->save();

		if(!$model->findAcl()
						->addGroup(Group::ID_INTERNAL)
						->save()) {
			return false;
		}

		
		return parent::afterInstall($model);
	}
	

	
	
	public function defineListeners() {
		User::on(Property::EVENT_MAPPING, static::class, 'onMap');
		User::on(User::EVENT_BEFORE_DELETE, static::class, 'onUserDelete');
	}
	
	public static function onMap(Mapping $mapping) {
		$mapping->addHasOne('notesSettings', UserSettings::class, ['id' => 'userId'], true);
	}

	public static function onUserDelete(core\db\Query $query) {
		NoteBook::delete(['createdBy' => $query]);
	}

}
