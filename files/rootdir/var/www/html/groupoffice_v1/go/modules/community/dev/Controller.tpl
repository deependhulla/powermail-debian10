<?php
namespace {namespace}\controller;

use go\core\jmap\Entity;
use go\core\jmap\EntityController;
use go\core\jmap\exception\InvalidArguments;
use go\core\jmap\exception\StateMismatch;
use {namespace}\model;

/**
 * The controller for the {model} entity
 *
 * @copyright (c) 2018, Intermesh BV http://www.intermesh.nl
 * @author Merijn Schering <mschering@intermesh.nl>
 * @license http://www.gnu.org/licenses/agpl-3.0.html AGPLv3
 */ 
class {model} extends EntityController {
	
	/**
	 * The class name of the entity this controller is for.
	 * 
	 * @return model\{model}
	 */
	protected function entityClass() {
		return model\{model}::class;
	}	
	
	/**
	 * Handles the {model} entity's {model}/query command
	 *
	 * @return array
	 * @param array $params
	 * @throws InvalidArguments
	 * @see https://jmap.io/spec-core.html#/query
	 */
	public function query($params) {
		return $this->defaultQuery($params);
	}
	
	/**
	 * Handles the {model} entity's {model}/get command
	 * 
	 * @param array $params
	 * @return array
	 * @throws InvalidArguments
	 * @see https://jmap.io/spec-core.html#/get
	 */
	public function get($params) {
		return $this->defaultGet($params);
	}
	
	/**
	 * Handles the {model} entity's {model}/set command
	 *
	 * @see https://jmap.io/spec-core.html#/set
	 * @param array $params
	 * @return array
	 * @throws StateMismatch
	 * @throws InvalidArguments
	 */
	public function set($params) {
		return $this->defaultSet($params);
	}
	
	/**
	 * Handles the {model} entity's {model}/changes command
	 * @param array $params
	 * @return mixed
	 * @throws InvalidArguments
	 * @see https://jmap.io/spec-core.html#/changes
	 */
	public function changes($params) {
		return $this->defaultChanges($params);
	}
}

