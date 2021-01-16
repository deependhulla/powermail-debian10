<?php
namespace GO\Projects\Model;

//classes for v1 migration only

class Project {
	
	public static function model(){
		
		return new self;
	}
	

	//Active record specification
	public function tableName() {
		return 'pm_projects';
	}

	public function customfieldsModel(){
		return "GO\Projects\Model\OldProjectCustomfields";
	}
}

class OldProjectCustomfields {
	
	public static function model(){
		
		return new self;
	}


	//Active record specification
	public function tableName() {
		return 'cf_pm_projects';
	}
}


class Hour {

	public static function model(){
		
		return new self;
	}
	//Active record specification
	public function tableName() {
		return 'pm_hours';
	}

	public function customfieldsModel(){
		return "GO\Projects\Model\OldHourCustomfields";
	}
}

class OldHourCustomfields {
public static function model(){
		
		return new self;
	}

	//Active record specification
	public function tableName() {
		return 'cf_pm_hours';
	}
}
