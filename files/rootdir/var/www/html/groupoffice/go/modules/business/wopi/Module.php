<?php
namespace go\modules\business\wopi;

use go\core;

/**						
 * 
 * 
 * Known issue with safari:
 * 
 * https://github.com/microsoft/Office-Online-Test-Tools-and-Documentation/issues/139
 * 
 * @copyright (c) 2019, Intermesh BV http://www.intermesh.nl
 * @author Merijn Schering <mschering@intermesh.nl>
 * @license http://www.gnu.org/licenses/agpl-3.0.html AGPLv3
 */
class Module extends core\Module {
							
	public function getAuthor() {
		return "Intermesh BV <info@intermesh.nl>";
	}

	public function requiredLicense()
	{
		return 'groupoffice-pro';
	}
								
}