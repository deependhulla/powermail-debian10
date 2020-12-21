<?php


namespace GO\Email\Model;


class ContactMailTime extends \GO\Base\Db\ActiveRecord {

	/**
	 * Returns a static model of itself
	 *
	 * @param String $className
	 * @return \GO\Base\Model\UserGroup
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}

	public function tableName() {
		return 'em_contacts_last_mail_times';
	}

	public function primaryKey() {
		return array('contact_id','user_id');
	}
}