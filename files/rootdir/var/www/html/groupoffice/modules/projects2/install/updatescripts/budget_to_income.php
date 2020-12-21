<?php

try {
	$query = "ALTER TABLE `pr2_income` ADD `is_contract` BOOLEAN NOT NULL DEFAULT FALSE , ADD `contract_repeat_amount` INT NOT NULL DEFAULT '1' , ADD `contract_repeat_freq` VARCHAR(10) NOT NULL DEFAULT '' , ADD `contract_end` INT NOT NULL DEFAULT '0' ;";
 	\GO::getDbConnection()->query($query);
} catch (\PDOException $e) {
	echo $e->getMessage() . "\n";
	echo "Query: " . $query;
}

try {
$query = "ALTER TABLE `pr2_income` ADD `contract_end_notification_days` INT NOT NULL DEFAULT '10' , ADD `contract_end_notification_active` BOOLEAN NOT NULL , ADD `contract_end_notification_template` INT NULL DEFAULT NULL ;";
\GO::getDbConnection()->query($query);
} catch (\PDOException $e) {
	echo $e->getMessage() . "\n";
	echo "Query: " . $query;
}

try{
$query = "ALTER TABLE `pr2_income` ADD `contract_end_notification_sent` INT NULL DEFAULT NULL ;";
\GO::getDbConnection()->query($query);
} catch (\PDOException $e) {
	echo $e->getMessage() . "\n";
	echo "Query: " . $query;
}

$stmt = \GO\Projects2\Model\Project::model()->find(
				\GO\Base\Db\FindParams::newInstance()->ignoreAcl()
);
$project = new \GO\Projects2\Model\Project();
foreach ($stmt as $project) {
	if (!empty($project->budget)) {
		$income = new \GO\Projects2\Model\Income();
		$income->amount = $project->budget;
		$income->description = 'Project budget';
		$income->type = \GO\Projects2\Model\Income::TYPE_CONTRACT_PRICE;
		$income->is_invoiced = true;
		$income->invoice_number = 'Budget';
		$income->invoice_at = $project->due_time ? $project->due_time : time();
		$income->project_id = $project->id;
		$income->save();
	}
}
