<?php

namespace go\modules\business\studio;

use go\core;
use go\modules\business\studio\model\Settings;
use go\modules\community\multi_instance\model\Instance;

/**
 * @copyright (c) 2020, Intermesh BV http://www.intermesh.nl
 * @author Merijn Schering <mschering@intermesh.nl>
 * @license http://www.gnu.org/licenses/agpl-3.0.html AGPLv3
 */
class Module extends core\Module
{

	public function getAuthor()
	{
		return "Joachim van de Haterd - Intermesh BV <jvdhaterd@intermesh.nl>";
	}

	public function requiredLicense()
	{
		return 'groupoffice-pro';
	}

	public function getSettings()
	{
		return Settings::get();
	}


}