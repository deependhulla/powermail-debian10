<?php

$updates['201309111730'][]="ALTER TABLE `ld_year_credits` CHANGE `n_hours` `n_hours` DOUBLE NOT NULL DEFAULT '0';";
$updates['201309111730'][]="ALTER TABLE `ld_leave_days` CHANGE `n_hours` `n_hours` DOUBLE NOT NULL DEFAULT '0';";

$updates['201312121327'][]="ALTER TABLE  `ld_year_credits` ADD  `manager_user_id` INT NULL ;";
$updates['201312121327'][]="ALTER TABLE ld_year_credits DROP PRIMARY KEY";
$updates['201312121327'][]="ALTER TABLE  `ld_year_credits` ADD  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY FIRST ;";
$updates['201312121327'][]="ALTER TABLE  `ld_leave_days` ADD  `approved` BOOLEAN NOT NULL DEFAULT  '0'";

$updates['201312121327'][]="update ld_leave_days set approved=true;";

$updates['201407310900'][]="ALTER TABLE `ld_leave_days` ADD `n_nat_holiday_hours` DOUBLE NOT NULL DEFAULT '0' AFTER `n_hours` ;";
$updates['201407310945'][]="script:1_store_national_holiday_hours.php";

$updates['201509031410'][]="ALTER TABLE `ld_leave_days` CHANGE `approved` `status` INT NOT NULL DEFAULT '0';";
$updates['201509031410'][]="ALTER TABLE `ld_leave_days` ADD `from_time` TIME NULL DEFAULT NULL AFTER `last_date`;";








//
$updates['201512240000'][] = "CREATE TABLE IF NOT EXISTS `ld_credit_types` (
  `id` int(11) AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `credit_doesnt_expired` tinyint(1) NOT NULL DEFAULT '0',
  `sort_index` int(11) NOT NULL DEFAULT '0',
	PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;";


$updates['201512240000'][]="
CREATE TABLE IF NOT EXISTS `ld_credits` (
  `ld_year_credit_id` int(11) NOT NULL,
  `ld_credit_type_id` int(11) NOT NULL,
  `n_hours` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;";


// Add ld_credit_type_id in to table ld_leave_days
$updates['201512240000'][]="ALTER TABLE `ld_leave_days` ADD `ld_credit_type_id` int(11) NOT NULL;";


// creat credit type
$updates['201512240000'][]="script:2_update_to_credit_types.php";



// copy hours from ld_year_credits to ld_credits and set credit type id 1
$updates['201512240000'][]="INSERT INTO `ld_credits`  (`ld_credits`.`ld_year_credit_id`, `ld_credits`.`ld_credit_type_id`, `ld_credits`.`n_hours`) SELECT `yc`.`id`, 1, `yc`.`n_hours` FROM `ld_year_credits` AS `yc`";





//set the current holyday to credit type 1
$updates['201512240000'][]="UPDATE `ld_leave_days` SET `ld_credit_type_id` = '1'";


$updates['201512240000'][]="ALTER TABLE `ld_credits` ADD PRIMARY KEY (`ld_year_credit_id`,`ld_credit_type_id`);";


$updates['201610281650'][] = 'ALTER TABLE `ld_credit_types` ENGINE=InnoDB;';
$updates['201610281650'][] = 'ALTER TABLE `ld_credit_types` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;';
$updates['201610281650'][] = 'ALTER TABLE `ld_credits` ENGINE=InnoDB;';
$updates['201610281650'][] = 'ALTER TABLE `ld_credits` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;';
$updates['201610281650'][] = 'ALTER TABLE `ld_leave_days` ENGINE=InnoDB;';
$updates['201610281650'][] = 'ALTER TABLE `ld_leave_days` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;';
$updates['201610281650'][] = 'ALTER TABLE `ld_year_credits` ENGINE=InnoDB;';
$updates['201610281650'][] = 'ALTER TABLE `ld_year_credits` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;';

$updates['201812040930'][] = "ALTER TABLE `ld_credit_types` ADD `active` tinyint(1) NOT NULL DEFAULT '1';";