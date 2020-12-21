<?php
namespace {namespace}\model;

use go\core\acl\model\AclOwnerEntity;
use go\core\model\Acl;
use go\core\orm\CustomFieldsTrait;
use go\core\orm\SearchableTrait;
use go\core\orm\Query;
use {namespace}\convert\Csv;
use {namespace}\Module;

/**
 * $entity model
 *
 *
 * @copyright (c) {year}, Intermesh BV http://www.intermesh.nl
 * @author {authorName} <{email}>
 * @license http://www.gnu.org/licenses/agpl-3.0.html AGPLv3
 */
class {model} extends AclOwnerEntity
{
	use SearchableTrait;
	use CustomFieldsTrait;

	/** @var int  */
	public $id;

	/** @var int */
	public $aclId;

	/** @var int  */
	public $createdBy;

	/** @var \go\core\util\DateTime  */
	public $createdAt;

	/** @var int  */
	public $modifiedBy;

	/** @var \go\core\util\DateTime  */
	public $modifiedAt;

	/** @var int */
	public $filesFolderId;

	protected static function defineMapping()
	{
		return parent::defineMapping()
			->addTable("{tablePrefix}_{tableAlias}", "{tableAlias}");
	}

	protected function getSearchDescription()
	{
		return {searchDescriptionFld};
	}

	public function title()
	{
		return {searchNameFld};
	}

	protected function canCreate()
	{
		return Module::get()->getModel()->hasPermissionLevel(Acl::LEVEL_MANAGE);
	}

	protected static function defineFilters()
	{
		return parent::defineFilters()
		->add('id', function(Criteria $criteria, $value) {
			if(!empty($value)) {
				$criteria->where(['id' => $value]);
			}
		});
	}

	/**
	 * @inheritDoc
	 */
	public static function converters()
	{
		return array_merge(parent::converters(), [Csv::class]);
	}
}
