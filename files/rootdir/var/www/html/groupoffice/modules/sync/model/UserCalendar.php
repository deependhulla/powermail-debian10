<?php
/**
 * Group-Office
 * 
 * Copyright Intermesh BV. 
 * This file is part of Group-Office. You should have received a copy of the
 * Group-Office license along with Group-Office. See the file /LICENSE.TXT
 *
 * If you have questions write an e-mail to info@intermesh.nl
 * 
 * @license AGPL/Proprietary http://www.group-office.com/LICENSE.TXT
 * @link http://www.group-office.com
 * @package GO.modules.sync.model
 * @version $Id: UserCalendar.php 17999 2014-01-24 16:32:11Z mschering $
 * @copyright Copyright Intermesh BV.
 * @author <<FIRST_NAME>> <<LAST_NAME>> <<EMAIL>>@intermesh.nl
 */
 
/**
 * The UserCalendar model
 *
 * @package GO.modules.sync.model
 * @property boolean $default_tasklist
 * @property int $user_id
 * @property int $tasklist_id
 * @property int $calendar_id
 * @property boolean $default_calendar
 */


namespace GO\Sync\Model;


class UserCalendar extends \GO\Base\Db\ActiveRecord{
	
	public function tableName() {
		return 'sync_calendar_user';
	}
	/**
	 * Returns a static model of itself
	 * 
	 * @param String $className
	 * @return UserTasklist 
	 */
	public static function model($className=__CLASS__)
	{	
		return parent::model($className);
	}
	
  
  public function primaryKey() {
    return array('user_id','calendar_id');
  }
	
}
