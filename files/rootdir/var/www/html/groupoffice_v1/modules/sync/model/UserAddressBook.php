<?php
namespace GO\Sync\Model;

use go\core\orm\Property;

class UserAddressBook extends Property {
	
	
	/**
	 *
	 * @var int
	 */
	public $userId;
	
	/**
	 *
	 * @var int
	 */
	public $addressBookId;
	
	/**
	 *
	 * @var boolean
	 */
	public $isDefault;
	protected static function defineMapping() {
		return parent::defineMapping()->addTable('sync_addressbook_user');
	}
}
