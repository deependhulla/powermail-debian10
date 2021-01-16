<?php
$updates["201108131020"][]="ALTER TABLE  `pr2_report_templates` ADD  `odf_extension` VARCHAR( 10 ) NOT NULL";

$updates["201108190000"][]="RENAME TABLE `go_links_5` TO `go_links_pr2_projects`;";
$updates["201108190000"][]="ALTER TABLE `go_links_pr2_projects` CHANGE `link_id` `model_id` INT( 11 ) NOT NULL";
$updates["201108190000"][]="ALTER TABLE `go_links_pr2_projects` CHANGE `link_type` `model_type_id` INT( 11 ) NOT NULL";


$updates["201108190000"][]="RENAME TABLE `cf_5` TO `cf_pr2_projects` ";
$updates["201108190000"][]="ALTER TABLE `cf_pr2_projects` CHANGE `link_id` `model_id` INT( 11 ) NOT NULL DEFAULT '0'";


$updates["201108301656"][]="INSERT INTO `go_model_types` (
`id` ,
`model_name`
)
VALUES (
'5', 'GO_Projects2_Model_Project'
);";

$updates["201108301656"][]="ALTER TABLE `pr2_projects` CHANGE `files_folder_id` `files_folder_id` INT( 11 ) NOT NULL DEFAULT '0'";
$updates["201108301656"][]="ALTER TABLE `pr2_projects` CHANGE `parent_project_id` `parent_project_id` INT( 11 ) NOT NULL DEFAULT '0'";
$updates["201108301656"][]="ALTER TABLE `pr2_projects` CHANGE `select_fee` `select_fee` BOOLEAN NOT NULL DEFAULT '0'";
$updates["201108301656"][]="ALTER TABLE `pr2_projects`  DROP `int_fee`,  DROP `ext_fee`;";
		
$updates["201108301656"][]="ALTER TABLE `pr2_projects`
  DROP `addressbook_id`,
  DROP `use_parent_addressbook`,
  DROP `tasklist_id`,
  DROP `use_parent_tasklist`;";
$updates["201108301656"][]="ALTER TABLE `pr2_projects` CHANGE `calendar_id` `calendar_id` INT( 11 ) NOT NULL DEFAULT '0'";
$updates["201108301656"][]="ALTER TABLE `pr2_projects` CHANGE `use_parent_calendar` `use_parent_calendar` TINYINT( 1 ) NOT NULL DEFAULT '0'";
$updates["201108301656"][]="ALTER TABLE `pr2_projects` CHANGE `event_id` `event_id` INT( 11 ) NOT NULL DEFAULT '0'";
$updates["201108301656"][]="ALTER TABLE `pr2_projects` CHANGE `id` `id` INT( 11 ) NOT NULL AUTO_INCREMENT ";

$updates["201110031000"][]="ALTER TABLE `pr2_expenses` CHANGE `invoice_id` `invoice_id` INT( 11 ) NOT NULL DEFAULT '0'";
$updates["201110031000"][]="ALTER TABLE `pr2_expenses` CHANGE `id` `id` INT( 11 ) NOT NULL AUTO_INCREMENT ";
$updates["201110031000"][]="ALTER TABLE `pr2_expenses` CHANGE `orig_currency` `orig_currency` CHAR( 3 ) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT ''";


$updates["201110031000"][]="ALTER TABLE `pr2_incomes` CHANGE `invoice_id` `invoice_id` INT( 11 ) NOT NULL DEFAULT '0'";
$updates["201110031000"][]="ALTER TABLE `pr2_incomes` CHANGE `id` `id` INT( 11 ) NOT NULL AUTO_INCREMENT ";
$updates["201110031000"][]="ALTER TABLE `pr2_incomes` CHANGE `orig_currency` `orig_currency` CHAR( 3 ) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT ''";


$updates["201110141221"][]="CREATE TABLE IF NOT EXISTS `cf_pr2_hours` (
  `model_id` int(11) NOT NULL,
  PRIMARY KEY (`model_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;";

$updates["201110141221"][]="UPDATE pr2_projects SET select_fee=0 where select_fee=1";
$updates["201110141221"][]="UPDATE pr2_projects SET select_fee=1 where select_fee=2";

$updates["201110141221"][]="ALTER TABLE `pr2_projects` DROP `note_category_id`";	

$updates["201111031110"][]="ALTER TABLE `pr2_projects` CHANGE `name` `name` VARCHAR( 100 ) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL ";
$updates["201111031110"][]="ALTER TABLE `pr2_projects` CHANGE `description` `description` TEXT CHARACTER SET utf8 COLLATE utf8_general_ci NULL ";
$updates["201111031110"][]="ALTER TABLE `pr2_projects` DROP `archived`";
$updates["201111031110"][]="ALTER TABLE `pr2_projects` CHANGE `responsible_user_id` `responsible_user_id` INT( 11 ) NOT NULL DEFAULT '0'";
$updates["201111031110"][]="ALTER TABLE `pr2_projects` CHANGE `start_time` `start_time` INT( 11 ) NOT NULL DEFAULT '0'";
$updates["201111031110"][]="ALTER TABLE `pr2_projects` CHANGE `due_time` `due_time` INT( 11 ) NOT NULL DEFAULT '0'";
$updates["201111031110"][]="ALTER TABLE `pr2_projects` CHANGE `units_budget` `units_budget` DOUBLE NOT NULL DEFAULT '0'";

$updates["201111031110"][]="ALTER TABLE `pr2_projects` CHANGE `template_id` `template_id` INT( 11 ) NOT NULL DEFAULT '0'";


$updates["201112061550"][]="RENAME TABLE `cf_19` TO `cf_pr2_hours` ";
$updates["201112061550"][]="ALTER TABLE `cf_pr2_hours` CHANGE `id` `model_id` INT( 11 ) NOT NULL DEFAULT '0'";
$updates["201112061550"][]="ALTER TABLE `pr2_hours` CHANGE `status` `status` TINYINT( 1 ) NOT NULL DEFAULT '0'";
$updates["201112061550"][]="ALTER TABLE `pr2_hours` CHANGE `invoice_id` `invoice_id` INT( 11 ) NOT NULL DEFAULT '0'";
$updates["201112061550"][]="ALTER TABLE `pr2_hours` CHANGE `payout_invoice_id` `payout_invoice_id` INT( 11 ) NOT NULL DEFAULT '0'";
$updates["201112061550"][]="ALTER TABLE `pr2_hours` CHANGE `id` `id` INT( 11 ) NOT NULL AUTO_INCREMENT	";

$updates["201112061550"][]="CREATE TABLE IF NOT EXISTS `cf_pr2_projects` (
  `model_id` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`model_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;";

$updates["201112061550"][]="CREATE TABLE IF NOT EXISTS `cf_pr2_hours` (
  `model_id` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`model_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;";

$updates["201112061550"][]="ALTER TABLE `pr2_statuses` CHANGE `id` `id` int(11) NOT NULL AUTO_INCREMENT;";
$updates["201112091330"][]="ALTER TABLE `pr2_types` CHANGE `id` `id` int(11) NOT NULL AUTO_INCREMENT;";
$updates["201112091330"][]="ALTER TABLE `pr2_types` CHANGE `acl_id` `acl_id` int(11) NOT NULL DEFAULT '0'";
$updates["201112091330"][]="ALTER TABLE `pr2_types` CHANGE `acl_book` `acl_book` int(11) NOT NULL DEFAULT '0'";

$updates["201112091430"][]="ALTER TABLE `pr2_templates` CHANGE `id` `id` int(11) NOT NULL AUTO_INCREMENT;";
$updates["201112091430"][]="ALTER TABLE `pr2_templates` CHANGE `files_folder_id` `files_folder_id` int(11) NOT NULL DEFAULT '0';";
$updates["201112091430"][]="ALTER TABLE `pr2_templates` CHANGE `fields` `fields` varchar(255) NOT NULL DEFAULT '';";
$updates["201112091430"][]="ALTER TABLE `pr2_templates` CHANGE `icon` `icon` varchar(255) NOT NULL DEFAULT '';";
$updates["201112091430"][]="ALTER TABLE `pr2_templates` CHANGE `default_status_id` `default_status_id` int(11) NOT NULL DEFAULT '0';";
$updates["201112091430"][]="ALTER TABLE `pr2_templates` CHANGE `default_type_id` `default_type_id` int(11) NOT NULL DEFAULT '0';";

$updates["201112121130"][]="ALTER TABLE `pr2_projects` CHANGE `status_id` `status_id` int(11) NOT NULL DEFAULT '0';";
$updates["201112121130"][]="ALTER TABLE `pr2_projects` CHANGE `type_id` `type_id` int(11) NOT NULL DEFAULT '0';";


$updates["201112131030"][]="ALTER TABLE `pr2_report_templates` ADD `type` varchar(3) NOT NULL DEFAULT 'pdf';";
$updates["201112131030"][]="ALTER TABLE `pr2_report_templates` CHANGE `id` `id` tinyint(11) NOT NULL AUTO_INCREMENT;";
$updates["201112131130"][]="CREATE TABLE IF NOT EXISTS `pr2_report_templates_pdf` (
	`template_id` int(11) NOT NULL DEFAULT '0',
	`fields` varchar(255) NOT NULL DEFAULT '',
  `header` text NULL,
  `footer` text NULL,
  `image` varchar(255) NOT NULL DEFAULT '',
  `img_top` int(11) NOT NULL DEFAULT '0',
  `img_left` int(11) NOT NULL DEFAULT '0',
  `img_width` int(11) NOT NULL DEFAULT '0',
  `img_height` int(11) NOT NULL DEFAULT '0',
  `no_page_breaks` tinyint(1) NOT NULL DEFAULT '0',
  `l_margin` int(11) NOT NULL DEFAULT '30',
  `t_margin` int(11) NOT NULL DEFAULT '60',
  `r_margin` int(11) NOT NULL DEFAULT '30',
  `b_margin` int(11) NOT NULL DEFAULT '30',
  `final_page_template` text NULL,
	PRIMARY KEY (`template_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;";
$updates["201112131330"][]="CREATE TABLE IF NOT EXISTS `pr2_report_templates_odf` (
	`template_id` int(11) NOT NULL DEFAULT '0',
	`fields` varchar(255) NOT NULL DEFAULT '',
  `header` text NULL,
  `footer` text NULL,
  `image` varchar(255) NOT NULL DEFAULT '',
  `img_top` int(11) NOT NULL DEFAULT '0',
  `img_left` int(11) NOT NULL DEFAULT '0',
  `img_width` int(11) NOT NULL DEFAULT '0',
  `img_height` int(11) NOT NULL DEFAULT '0',
  `no_page_breaks` tinyint(1) NOT NULL DEFAULT '0',
  `l_margin` int(11) NOT NULL DEFAULT '30',
  `t_margin` int(11) NOT NULL DEFAULT '60',
  `r_margin` int(11) NOT NULL DEFAULT '30',
  `b_margin` int(11) NOT NULL DEFAULT '30',
  `final_page_template` text NULL,
	`odf_extension` varchar(10) NOT NULL DEFAULT '',
	PRIMARY KEY (`template_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;";
$updates["201112131330"][]="CREATE TABLE IF NOT EXISTS `pr2_report_templates_csv` (
	`template_id` varchar(255) NOT NULL,
	`rows` text NULL,
	PRIMARY KEY (`template_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;";

$updates["201112131330"][]="ALTER TABLE `pr2_report_pages` CHANGE `id` `id` int(11) NOT NULL AUTO_INCREMENT;";
$updates["201112131330"][]="ALTER TABLE `pr2_report_pages` CHANGE `report_template_id` `report_template_id` int(11) NOT NULL DEFAULT '0';";
$updates["201112131330"][]="ALTER TABLE `pr2_report_pages` CHANGE `sort_order` `sort_order` int(11) NOT NULL DEFAULT '0';";
$updates["201112131330"][]="ALTER TABLE `pr2_report_pages` CHANGE `title` `title` varchar(100) NOT NULL DEFAULT '';";
$updates["201112131330"][]="ALTER TABLE `pr2_report_pages` CHANGE `subtitle` `subtitle` varchar(100) NOT NULL DEFAULT '';";
$updates["201112131330"][]="ALTER TABLE `pr2_report_pages` CHANGE `content` `content` text NULL;";
$updates["201112131330"][]="ALTER TABLE `pr2_report_pages` CHANGE `mtime` `mtime` int(11) NOT NULL DEFAULT '0';";
$updates["201112131330"][]="ALTER TABLE `pr2_report_pages` CHANGE `landscape` `landscape` tinyint(1) NOT NULL DEFAULT '0';";
$updates["201112131330"][]="ALTER TABLE `pr2_report_templates` CHANGE `id` `id` int(11) NOT NULL AUTO_INCREMENT;";
$updates["201112131330"][]="ALTER TABLE `pr2_report_templates` CHANGE `user_id` `user_id` int(11) NOT NULL DEFAULT '0';";
$updates["201112131330"][]="ALTER TABLE `pr2_report_templates` CHANGE `name` `name` varchar(100) NOT NULL DEFAULT '';";

$updates["201112131330"][]='script:1_convert_report_templates.inc.php';

$updates["201112150955"][]="ALTER TABLE `pr2_report_templates_csv` CHANGE `rows` `headers` TEXT NULL;";
$updates["201112150955"][]="ALTER TABLE `pr2_report_templates_csv` ADD `tags` TEXT NULL;";
$updates["201112151015"][]="ALTER TABLE `pr2_report_templates` DROP `fields`;";
$updates["201112151015"][]="ALTER TABLE `pr2_report_templates` DROP `header`;";
$updates["201112151015"][]="ALTER TABLE `pr2_report_templates` DROP `footer`;";
$updates["201112151015"][]="ALTER TABLE `pr2_report_templates` DROP `image`;";
$updates["201112151015"][]="ALTER TABLE `pr2_report_templates` DROP `img_top`;";
$updates["201112151015"][]="ALTER TABLE `pr2_report_templates` DROP `img_left`;";
$updates["201112151015"][]="ALTER TABLE `pr2_report_templates` DROP `img_width`;";
$updates["201112151015"][]="ALTER TABLE `pr2_report_templates` DROP `img_height`;";
$updates["201112151015"][]="ALTER TABLE `pr2_report_templates` DROP `no_page_breaks`;";
$updates["201112151015"][]="ALTER TABLE `pr2_report_templates` DROP `l_margin`;";
$updates["201112151015"][]="ALTER TABLE `pr2_report_templates` DROP `t_margin`;";
$updates["201112151015"][]="ALTER TABLE `pr2_report_templates` DROP `r_margin`;";
$updates["201112151015"][]="ALTER TABLE `pr2_report_templates` DROP `b_margin`;";
$updates["201112151015"][]="ALTER TABLE `pr2_report_templates` DROP `final_page_template`;";
$updates["201112151015"][]="ALTER TABLE `pr2_report_templates` DROP `odf_extension`;";

$updates["201112201200"][]="ALTER TABLE `pr2_custom_reports` CHANGE `query` `query` text NULL;";
$updates["201112201200"][]="ALTER TABLE `pr2_custom_reports` ADD `adv_query_data` text NULL;";
$updates["201112201200"][]="ALTER TABLE `pr2_custom_reports` CHANGE `query_templates` `query_templates` varchar(255) NOT NULL DEFAULT '';";
$updates["201112201200"][]="ALTER TABLE `pr2_custom_reports` CHANGE `query_fields` `query_fields` varchar(255) NOT NULL DEFAULT '';";
$updates["201112201200"][]="ALTER TABLE `pr2_custom_reports` CHANGE `id` `id` int(11) NOT NULL AUTO_INCREMENT;";
$updates["201112211415"][]="ALTER TABLE `pr2_report_templates_pdf` CHANGE `final_page_template` `final_page_template` text NULL";
$updates["201112211415"][]="ALTER TABLE `pr2_report_templates_odf` CHANGE `final_page_template` `final_page_template` text NULL";

$updates["201112231100"][]="RENAME TABLE `go_links_14` TO `go_links_pr2_report_templates`;";
$updates["201112231100"][]="ALTER TABLE `go_links_pr2_report_templates` CHANGE `link_id` `model_id` INT( 11 ) NOT NULL";
$updates["201112231100"][]="ALTER TABLE `go_links_pr2_report_templates` CHANGE `link_type` `model_type_id` INT( 11 ) NOT NULL";
$updates["201112231100"][]="RENAME TABLE `cf_14` TO `cf_pr2_report_templates` ";
$updates["201112231100"][]="ALTER TABLE `cf_pr2_report_templates` CHANGE `link_id` `model_id` INT( 11 ) NOT NULL DEFAULT '0'";
$updates["201112231100"][]="INSERT INTO `go_model_types` (
`id` ,
`model_name`
)
VALUES (
'14', 'GO_Projects2_Model_ReportTemplate'
);";

$updates["201201021115"][]="ALTER TABLE `pr2_templates` CHANGE `id` `id` int(11) NOT NULL AUTO_INCREMENT;";
$updates["201201021115"][]="ALTER TABLE `pr2_templates` CHANGE `user_id` `user_id` int(11) NOT NULL DEFAULT '0';";
$updates["201201021115"][]="ALTER TABLE `pr2_templates` CHANGE `name` `name` varchar(50) NOT NULL DEFAULT '';";
$updates["201201021115"][]="ALTER TABLE `pr2_templates` CHANGE `acl_id` `acl_id` int(11) NOT NULL DEFAULT '0';";
$updates["201201021115"][]="ALTER TABLE `pr2_templates` CHANGE `files_folder_id` `files_folder_id` int(11) NOT NULL DEFAULT '0';";
$updates["201201021115"][]="ALTER TABLE `pr2_templates` CHANGE `fields` `fields` varchar(255) NOT NULL DEFAULT ''";
$updates["201201021115"][]="ALTER TABLE `pr2_templates` CHANGE `icon` `icon` varchar(255) NOT NULL DEFAULT ''";
$updates["201201021115"][]="ALTER TABLE `pr2_templates` CHANGE `default_status_id` `default_status_id` int(11) NOT NULL DEFAULT '0'";
$updates["201201021115"][]="ALTER TABLE `pr2_templates` CHANGE `default_type_id` `default_type_id` int(11) NOT NULL DEFAULT '0'";

$updates["201201021200"][]="ALTER TABLE `pr2_statuses` CHANGE `id` `id` int(11) NOT NULL AUTO_INCREMENT;";
$updates["201201021200"][]="ALTER TABLE `pr2_statuses` CHANGE `name` `name` varchar(50) NOT NULL DEFAULT '';";
$updates["201201021200"][]="ALTER TABLE `pr2_statuses` CHANGE `complete` `complete` enum('0','1') NOT NULL DEFAULT '0';";
$updates["201201021200"][]="ALTER TABLE `pr2_statuses` CHANGE `sort_order` `sort_order` int(11) NOT NULL DEFAULT '0';";

$updates["201201021600"][]="ALTER TABLE `pr2_expense_types` CHANGE `name` `name` varchar(255) NOT NULL DEFAULT '';";
$updates["201201021600"][]="ALTER TABLE `pr2_income_types` CHANGE `name` `name` varchar(255) NOT NULL DEFAULT '';";
$updates["201201021600"][]="ALTER TABLE `pr2_user_fees` CHANGE `internal_value` `internal_value` double NOT NULL DEFAULT '0';";
$updates["201201021600"][]="ALTER TABLE `pr2_user_fees` CHANGE `external_value` `external_value` double NOT NULL DEFAULT '0';";

$updates["201201031030"][]="ALTER TABLE `pr2_custom_reports` CHANGE `start_time` `start_time` int(11) NOT NULL DEFAULT '0';";
$updates["201201031030"][]="ALTER TABLE `pr2_custom_reports` CHANGE `end_time` `end_time` int(11) NOT NULL DEFAULT '0';";
$updates["201201031030"][]="ALTER TABLE `pr2_custom_reports` CHANGE `batch` `batch` varchar(20) NOT NULL DEFAULT '';";
$updates["201201031030"][]="ALTER TABLE `pr2_expenses` CHANGE `amount` `amount` double NOT NULL DEFAULT '0';";
$updates["201201031030"][]="ALTER TABLE `pr2_expenses` CHANGE `date` `date` int(11) NOT NULL DEFAULT '0';";
$updates["201201031030"][]="ALTER TABLE `pr2_expenses` CHANGE `description` `description` varchar(255) NOT NULL DEFAULT '';";
$updates["201201031030"][]="ALTER TABLE `pr2_hours` CHANGE `status` `status` tinyint(1) NOT NULL DEFAULT '0';";
$updates["201201031030"][]="ALTER TABLE `pr2_hours` CHANGE `ctime` `ctime` int(11) NOT NULL DEFAULT '0';";
$updates["201201031030"][]="ALTER TABLE `pr2_hours` CHANGE `mtime` `mtime` int(11) NOT NULL DEFAULT '0';";
$updates["201201031030"][]="ALTER TABLE `pr2_incomes` CHANGE `type` `type` varchar(100) NOT NULL DEFAULT '';";
$updates["201201031030"][]="ALTER TABLE `pr2_incomes` CHANGE `amount` `amount` double NOT NULL DEFAULT '0';";
$updates["201201031030"][]="ALTER TABLE `pr2_incomes` CHANGE `date` `date` int(11) NOT NULL DEFAULT '0';";
$updates["201201031030"][]="ALTER TABLE `pr2_projects` CHANGE `name` `name` varchar(100) NOT NULL DEFAULT '';";
$updates["201201031030"][]="ALTER TABLE `pr2_projects` CHANGE `customer` `customer` varchar(50) DEFAULT NULL DEFAULT '';";
$updates["201201031030"][]="ALTER TABLE `pr2_projects` CHANGE `path` `path` varchar(255) NOT NULL DEFAULT '';";
$updates["201201031030"][]="ALTER TABLE `pr2_template_tabs` CHANGE `name` `name` varchar(100) NOT NULL DEFAULT '';";
$updates["201201031030"][]="ALTER TABLE `pr2_template_tabs` CHANGE `sort` `sort` int(11) NOT NULL DEFAULT '0';";
$updates["201201031030"][]="ALTER TABLE `pr2_template_tabs_cf` CHANGE `sort` `sort` int(11) NOT NULL DEFAULT '0';";
$updates["201201031030"][]="ALTER TABLE `pr2_templates_events` CHANGE `new_template_id` `new_template_id` int(11) NOT NULL DEFAULT '0';";
$updates["201201031030"][]="ALTER TABLE `pr2_templates_events` CHANGE `id` `id` int(11) NOT NULL AUTO_INCREMENT;";

$updates["201201031715"][]="ALTER TABLE `pr2_incomes` CHANGE `description` `description` varchar(255) NOT NULL DEFAULT '';";

$updates["201201031715"][]="ALTER TABLE `pr2_types` DROP `acl_write`";
$updates["201201031715"][]="ALTER TABLE `pr2_types` ADD `files_folder_id` INT NOT NULL DEFAULT '0'";

$updates["201201031715"][]="ALTER TABLE `pr2_templates` ADD `show_in_tree` BOOLEAN NOT NULL DEFAULT '0'";

$updates["201201031715"][]="ALTER TABLE `pr2_projects` ADD `tasklist_id` INT NOT NULL DEFAULT '0'";
$updates["201201031715"][]="ALTER TABLE `pr2_projects` DROP `use_parent_calendar`";

$updates["201202031630"][]="RENAME TABLE `pr2_order_special_items` TO `pr2_order_unsummarized_items`;";
$updates["201202061445"][]="ALTER TABLE `pr2_order_unsummarized_items` CHANGE `id` `id` int(11) AUTO_INCREMENT;";

$updates["201202081545"][]="ALTER TABLE `pr2_order_unsummarized_items` DROP `unit_cost`;";
$updates["201202081545"][]="ALTER TABLE `pr2_order_unsummarized_items` DROP `unit_list`;";
$updates["201202081545"][]="ALTER TABLE `pr2_order_unsummarized_items` DROP `discount`;";

$updates["201203131553"][]="RENAME TABLE `pr2_portlet_settings` TO `pr2_portlet_statuses` ;";

$updates["201203131553"][]="ALTER TABLE `pr2_portlet_statuses` DROP `visible`";
$updates["201203131553"][]="ALTER TABLE `pr2_portlet_statuses` DROP `id`";
$updates["201203131553"][]="ALTER TABLE `pr2_portlet_statuses` ADD PRIMARY KEY ( `user_id` , `status_id` ) ;";

$updates["201203131553"][]="CREATE TABLE IF NOT EXISTS `pr2_order_unsummarized_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) NOT NULL DEFAULT '0',
  `project_id` int(11) NOT NULL DEFAULT '0',
  `description` text,
  `unit_price` double NOT NULL DEFAULT '0',
  `unit_total` double NOT NULL DEFAULT '0',
  `amount` double NOT NULL DEFAULT '0',
  `vat` double NOT NULL DEFAULT '0',
	`total` double NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `order_id` (`order_id`),
  KEY `project_id` (`project_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;";


$updates["201205311451"][]="UPDATE pr2_projects SET parent_project_id=0 where parent_project_id=id;";

$updates["201206110859"][]="ALTER TABLE `pr2_projects` CHANGE `customer` `customer` VARCHAR( 100 ) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT ''";

$updates["201206110859"][]="CREATE TABLE IF NOT EXISTS `pr2_standard_tasks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `units` double NOT NULL,
  `description` text,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8;";

$updates["201206261040"][]="ALTER TABLE `pr2_hours` CHANGE `invoice_id` `invoice_id` INT( 11 ) NOT NULL DEFAULT '0'";
$updates["201206261040"][]="ALTER TABLE `pr2_hours` CHANGE `payout_invoice_id` `payout_invoice_id` INT( 11 ) NOT NULL DEFAULT '0'";

$updates["201211051027"][]="UPDATE pr2_hours set ctime=date where ctime=0;";
$updates["201211051027"][]="UPDATE pr2_hours set mtime=date where mtime=0;";

#UPDATE to 4.1

$updates["201302271100"][]="CREATE TABLE IF NOT EXISTS `pr2_fee_categories` (
  `id` INT(11) NOT NULL AUTO_INCREMENT ,
  `name` VARCHAR(255) NOT NULL ,
  `description` TEXT NULL DEFAULT NULL ,
  `internal_fee` DOUBLE NOT NULL DEFAULT 0 ,
  `fee` DOUBLE NOT NULL DEFAULT 0 ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;";

$updates["201302271100"][]="CREATE TABLE IF NOT EXISTS `pr2_budget_categories` (
  `id` INT(11) NOT NULL AUTO_INCREMENT ,
  `name` VARCHAR(255) NOT NULL ,
  `description` TEXT NULL DEFAULT NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;";

$updates["201302271100"][]="CREATE TABLE IF NOT EXISTS `pr2_default_fees` (
  `type_id` INT(11) NOT NULL ,
  `user_id` INT(11) NOT NULL ,
  `internal_fee` DOUBLE NOT NULL DEFAULT 0 ,
  `fee` DOUBLE NOT NULL DEFAULT 0 ,
  `fee_category_id` INT(11) NULL DEFAULT NULL ,
  PRIMARY KEY (`user_id`, `type_id`) ,
  INDEX `fk_pr2_default_fees_pr2_fee_categories1_idx` (`fee_category_id` ASC) ,
  INDEX `fk_pr2_default_fees_pr2_types1_idx` (`type_id` ASC) )
ENGINE = InnoDB;";

$updates["201302271100"][]="ALTER TABLE `cf_pr2_hours` ENGINE = InnoDB;";
$updates["201302271100"][]="ALTER TABLE `cf_pr2_projects` ENGINE = InnoDB;";
$updates["201302271100"][]="ALTER TABLE `go_links_pr2_projects` ENGINE = InnoDB";

$updates["201302271100"][]="ALTER TABLE `pr2_custom_reports` ENGINE = InnoDB;";

$updates["201302271100"][]="CREATE TABLE IF NOT EXISTS `pr2_expense_budgets` (
  `id` INT(11) NOT NULL AUTO_INCREMENT ,
  `description` VARCHAR(255) NOT NULL DEFAULT '' ,
  `nett` DOUBLE NOT NULL DEFAULT '0' ,
  `vat` DOUBLE NOT NULL DEFAULT '0' ,
  `ctime` INT(11) NOT NULL ,
  `mtime` INT(11) NOT NULL ,
  `supplier_company_id` INT(11) NULL DEFAULT NULL ,
  `budget_category_id` INT(11) NOT NULL ,
  `project_id` INT(11) NOT NULL ,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;";

$updates["201302271100"][]="ALTER TABLE `pr2_expense_types` ENGINE = InnoDB , 
  ADD COLUMN `code` VARCHAR(45) NULL DEFAULT NULL  AFTER `id` , 
  ADD COLUMN `description` VARCHAR(255) NULL DEFAULT NULL  AFTER `name`;";

$updates["201302271100"][]="ALTER TABLE `pr2_expenses` ENGINE = InnoDB , 
  DROP COLUMN `orig_exchange`,
  DROP COLUMN `orig_currency`,
  CHANGE COLUMN `amount` `nett` DOUBLE NOT NULL DEFAULT '0', 
  CHANGE COLUMN `invoice_id` `invoice_id` VARCHAR(100) NOT NULL , 
  CHANGE COLUMN `project_id` `project_id` INT(11) NOT NULL , 
  ADD COLUMN `vat` DOUBLE NOT NULL DEFAULT '0' AFTER `nett` ,
  ADD COLUMN `mtime` INT(11) NOT NULL  AFTER `description` , 
  ADD COLUMN `expense_budget_id` INT(11) NULL DEFAULT NULL  AFTER `mtime` , 
  ADD COLUMN `expense_type_id` INT(11) NULL DEFAULT NULL  AFTER `invoice_id` , 
  ADD INDEX `fk_pr2_expenses_pr2_expense_budgets1_idx` (`expense_budget_id` ASC) ,
  ADD INDEX `fk_pr2_expenses_pr2_expense_types1_idx` (`expense_type_id` ASC) ,
  ADD INDEX `fk_pr2_expenses_pr2_projects1_idx` (`project_id` ASC) ,
  DROP INDEX `project_id`;";

$updates["201302271100"][]="ALTER TABLE `pr2_expenses` DROP COLUMN `type`;"; //might fail

$updates["201302271100"][]="DROP TABLE IF EXISTS `pr2_fees`;";

$updates["201302271100"][]="ALTER TABLE `pr2_hours` 
  DROP COLUMN `fee_time` , 
  DROP COLUMN `fee_id` , 
  CHANGE COLUMN `int_fee_value` `internal_fee` DOUBLE NOT NULL DEFAULT '0'  AFTER `comments` ,
  CHANGE COLUMN `ext_fee_value` `fee` DOUBLE NOT NULL DEFAULT '0'  AFTER `comments` , 
  CHANGE COLUMN `project_id` `project_id` INT(11) NULL DEFAULT NULL  AFTER `mtime` , 
  CHANGE COLUMN `user_id` `user_id` INT(11) NOT NULL, 
  CHANGE COLUMN `status` `status` INT(11) NOT NULL DEFAULT '0'  , 
  ADD COLUMN `standard_task_id` INT(11) NULL DEFAULT NULL  AFTER `project_id` , 
  ADD COLUMN `duration` INT(11) NOT NULL DEFAULT 0  AFTER `user_id` 
, ADD INDEX `fk_pr2_hours_pr2_projects1_idx` (`project_id` ASC) 
, ADD INDEX `fk_pr2_hours_pr2_standard_tasks1_idx` (`standard_task_id` ASC) 
, DROP INDEX `project_id` ";

//$updates["201302271100"][]="DROP TABLE IF EXISTS `pr2_order_unsummarized_items`;";
$updates["201302271100"][]="";

$updates["201302271100"][]="ALTER TABLE `pr2_projects` ENGINE = InnoDB , 
  CHANGE COLUMN `status_id` `status_id` INT(11) NULL DEFAULT NULL  AFTER `tasklist_id` , 
  CHANGE COLUMN `type_id` `type_id` INT(11) NOT NULL  AFTER `status_id` , 
  CHANGE COLUMN `template_id` `template_id` INT(11) NOT NULL  AFTER `type_id` , 
  CHANGE COLUMN `parent_project_id` `parent_project_id` INT(11) NULL DEFAULT NULL  AFTER `template_id` , 
  ADD COLUMN `threshold_mails` VARCHAR(45) NULL DEFAULT NULL  AFTER `mtime` , 
  ADD INDEX `fk_pr2_projects_pr2_statuses1_idx` (`status_id` ASC) ,
  ADD INDEX `fk_pr2_projects_pr2_types1_idx` (`type_id` ASC) ,
  ADD INDEX `fk_pr2_projects_pr2_templates1_idx` (`template_id` ASC) ,
  DROP INDEX `parent_project_id` ,
  DROP INDEX `type_id` ,
  DROP INDEX `status_id` ;";

$updates["201302271100"][]="ALTER TABLE `pr2_report_pages` ENGINE = InnoDB;";

$updates["201302271100"][]="ALTER TABLE `pr2_report_projects` ENGINE = InnoDB;";

$updates["201302271100"][]="ALTER TABLE `pr2_report_templates_csv` ENGINE = InnoDB;";

$updates["201302271100"][]="ALTER TABLE `pr2_report_templates_odf` ENGINE = InnoDB;";

$updates["201302271100"][]="ALTER TABLE `pr2_report_templates_pdf` ENGINE = InnoDB;";

$updates["201302271100"][]="ALTER TABLE `pr2_standard_tasks` 
  ADD COLUMN `type` INT(11) NOT NULL DEFAULT 1  AFTER `description` , 
  ADD COLUMN `daily` TINYINT(1) NOT NULL DEFAULT 0  AFTER `type` , 
  ADD COLUMN `disabled` TINYINT(1) NOT NULL DEFAULT 0  AFTER `daily` ;";

$updates["201302271100"][]="ALTER TABLE `pr2_statuses` ENGINE = InnoDB , 
  CHANGE COLUMN `complete` `complete` TINYINT(1) NOT NULL DEFAULT '0'  , 
  ADD COLUMN `filterable` TINYINT(1) NOT NULL DEFAULT '1'  AFTER `sort_order`; ";

$updates["201302271100"][]="DROP TABLE IF EXISTS `pr2_template_tabs`;";

$updates["201302271100"][]="DROP TABLE IF EXISTS `pr2_template_tabs_cf`;";

$updates["201302271100"][]="ALTER TABLE `pr2_templates` ENGINE = InnoDB , 
  CHANGE COLUMN `show_in_tree` `show_in_tree` TINYINT(1) NOT NULL DEFAULT '0'  AFTER `icon` , 
  CHANGE COLUMN `default_type_id` `default_type_id` INT(11) NULL DEFAULT NULL , 
  CHANGE COLUMN `default_status_id` `default_status_id` INT(11) NOT NULL  , 
  ADD COLUMN `project_type` TINYINT(4) NOT NULL DEFAULT '0'  AFTER `show_in_tree` ,
  ADD INDEX `fk_pr2_templates_pr2_types1_idx` (`default_type_id` ASC) ,
  ADD INDEX `fk_pr2_templates_pr2_statuses1_idx` (`default_status_id` ASC) ;";

$updates["201302271100"][]="ALTER TABLE `pr2_templates_events` ENGINE = InnoDB , 
  CHANGE COLUMN `template_id` `template_id` INT(11) NOT NULL  AFTER `new_template_id` , 
  CHANGE COLUMN `time_offset` `time_offset` INT(11) NULL DEFAULT NULL  , 
  CHANGE COLUMN `duration` `duration` INT(11) NULL DEFAULT NULL  , 
  ADD INDEX `fk_pr2_templates_events_pr2_templates1_idx` (`template_id` ASC) ,
  DROP INDEX `template_id`; ";

$updates["201302271100"][]="ALTER TABLE `pr2_timers` ENGINE = InnoDB , 
  DROP INDEX `project_id` ,
  ADD INDEX `project_id` (`user_id` ASC, `starttime` ASC) ,
  ADD PRIMARY KEY (`project_id`, `user_id`) ;";

$updates["201302271100"][]="ALTER TABLE `pr2_types` ENGINE = InnoDB ;";

$updates["201302271100"][]="ALTER TABLE `pr2_user_fees` ENGINE = InnoDB , 
  CHANGE COLUMN `external_value` `external_value` DOUBLE NULL DEFAULT NULL  AFTER `user_id`, 
  CHANGE COLUMN `internal_value` `internal_fee` DOUBLE NULL DEFAULT NULL  AFTER `user_id`, 
  CHANGE COLUMN `project_id` `project_id` INT(11) NOT NULL DEFAULT '0' , 
  ADD COLUMN `budgeted_units` DOUBLE NOT NULL DEFAULT '0'  AFTER `user_id` , 
  ADD COLUMN `fee_category_id` INT(11) NULL DEFAULT NULL  AFTER `budgeted_units` , 
  ADD INDEX `fk_pr2_user_fees_pr2_fee_categories_idx` (`fee_category_id` ASC) ,
  ADD INDEX `fk_pr2_user_fees_pr2_projects1_idx` (`project_id` ASC); ";

$updates["201302271100"][]="DROP TABLE IF EXISTS `pr2_weeks`;";

$updates['201302281100'][]="UPDATE cf_categories SET `extends_model`='GO_Projects2_Model_TimeEntry' WHERE `extends_model` = 'GO_Projects2_Model_Hour';";

$updates['201302281100'][]="UPDATE pr2_hours SET duration = units * 60;";

$updates["201303011100"][]="ALTER TABLE `pr2_types` DROP COLUMN `files_folder_id`;";

$updates["201303011100"][]="DROP TABLE IF EXISTS `pr2_incomes`;";

$updates["201303011100"][]="DROP TABLE IF EXISTS `pr2_income_types`;";

$updates["201303011100"][]="DROP TABLE IF EXISTS `pr2_unsummarized_items`;";
## END 4.1 UPDATE

$updates["201303111330"][]="ALTER TABLE `pr2_hours` ADD COLUMN `type` INT NOT NULL DEFAULT 0  AFTER `duration` ;";

$updates["201303111330"][]="ALTER TABLE `pr2_expenses` CHANGE COLUMN `expense_types_id` `expense_type_id`;"; 

//$updates["201210081228"][]="update`pr2_templates_events` set time_offset=time_offset/24 where time_offset>0;";

$updates["201303211545"][]="ALTER TABLE `pr2_hours` ADD COLUMN `fee_category_id` DOUBLE NOT NULL DEFAULT '0'  AFTER `duration` ;";

$updates["201303251338"][]="CREATE TABLE IF NOT EXISTS `pr2_employees` (
  `user_id` INT NOT NULL ,
  `start_time` INT NOT NULL ,
  `leave_time` INT NULL DEFAULT NULL ,
  `yearly_leavetime` DOUBLE NOT NULL DEFAULT 0 ,
  `workhours_monday` DOUBLE NOT NULL DEFAULT 0 ,
  `workhours_tuesday` DOUBLE NOT NULL DEFAULT 0 ,
  `workhours_wednesday` DOUBLE NOT NULL DEFAULT 0 ,
  `workhours_thursday` DOUBLE NOT NULL DEFAULT 0 ,
  `workhours_friday` DOUBLE NOT NULL DEFAULT 0 ,
  `workhours_saturday` DOUBLE NOT NULL DEFAULT 0 ,
  `workhours_sunday` DOUBLE NOT NULL DEFAULT 0 ,
  `internal_fee` DOUBLE NOT NULL DEFAULT 0 ,
  `fee` DOUBLE NOT NULL DEFAULT 0 ,
  `fee_category_id` INT NULL DEFAULT NULL ,
  PRIMARY KEY (`user_id`, `start_time`) ,
  INDEX `fk_pr2_employees_pr2_fee_categories1` (`fee_category_id` ASC) )
ENGINE = InnoDB;";

$updates["201303271133"][]="ALTER TABLE `pr2_hours` CHANGE COLUMN `fee_category_id` `fee_category_id` DOUBLE NULL DEFAULT NULL ;";

$updates["201304260928"][]="ALTER TABLE `pr2_employees` ADD COLUMN `id` INT(11) NOT NULL AUTO_INCREMENT  FIRST, DROP PRIMARY KEY, ADD PRIMARY KEY (`id`);";

$updates["201304261402"][]="ALTER TABLE `pr2_employees` ADD COLUMN `closed_entries_time` INT NOT NULL  AFTER `leave_time`;";


$updates['201305011349'][]="ALTER TABLE `pr2_employees` CHANGE COLUMN `user_id` `employee_id` INT;";
$updates['201305011349'][]="RENAME TABLE pr2_employees TO pr2_employment_agreements;";
$updates['201305011349'][]="CREATE  TABLE IF NOT EXISTS `pr2_employees` (
  `id` INT NOT NULL ,
  `closed_entries_time` INT NULL ,
  `ctime` INT NULL ,
  `mtime` INT NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;";
$updates['201305011349'][]="RENAME TABLE pr2_user_fees TO pr2_resources;";

$updates["201305070912"][]="ALTER TABLE `pr2_employment_agreements` DROP COLUMN `closed_entries_time`;";

$updates["201305141616"][]="ALTER TABLE `pr2_resources` ADD COLUMN `disabled` TINYINT(1) NOT NULL DEFAULT 0;";

$updates["201306241002"][]="ALTER TABLE `pr2_statuses` ADD `acl_id` INT NOT NULL DEFAULT '0';";

$updates["201306241018"][]="script:share_existing_statuses.php";

$updates["201306241220"][]="ALTER TABLE  `pr2_projects` ADD  `default_distance` DOUBLE NULL DEFAULT NULL;";

$updates["201306241357"][]="CREATE TABLE IF NOT EXISTS `pr2_mileage_registrations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `employee_id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `timeentry_id` int(11) DEFAULT NULL,
  `distance` double NOT NULL,
  `mileage_description` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;";

$updates["201306261027"][]="ALTER TABLE `pr2_hours` DROP COLUMN `fee_category_id`;";

$updates["201307031123"][]="UPDATE `pr2_templates` SET `fields` = replace(`fields`, 'status_date', 'status,date');";

$updates['201308211328'][]="ALTER TABLE `pr2_statuses` ADD `show_in_tree` BOOLEAN NOT NULL DEFAULT '1';";

$updates['201309170914'][]="ALTER TABLE `pr2_mileage_registrations` CHANGE  `employee_id`  `user_id` INT( 11 ) NOT NULL;";

$updates['201309171127'][]="ALTER TABLE  `pr2_hours` CHANGE  `units`  `units` DOUBLE NOT NULL DEFAULT  '0'";
$updates['201309171127'][]="update pr2_hours set units=duration/60";


$updates['201310041023'][]="ALTER TABLE  `pr2_employees` ADD  `fee` DOUBLE NOT NULL DEFAULT  '0'";
	
$updates['201310041023'][]="drop table pr2_default_fees;";
$updates['201310041023'][]="DROP TABLE `pr2_custom_reports`, `pr2_employment_agreements`, `pr2_fee_categories`, `pr2_incomes`, `pr2_income_types`, `pr2_report_pages`, `pr2_report_projects`, `pr2_report_templates`, `pr2_report_templates_csv`, `pr2_report_templates_odf`, `pr2_report_templates_pdf`;";

$updates['201310041023'][]="DROP TABLE pr2_activity_types";
	
$updates['201310041023'][]="ALTER TABLE `pr2_resources`
  DROP `fee_category_id`";

$updates['201310041023'][]="ALTER TABLE  `pr2_resources` CHANGE  `fee`  `fee` DOUBLE NULL DEFAULT NULL";
$updates['201310041023'][]="ALTER TABLE `pr2_resources` DROP `disabled`";
	
$updates['201310041023'][]="ALTER TABLE `pr2_projects`
  DROP `select_fee`,
  DROP `tasklist_id`;";
	
$updates['201310041023'][]="ALTER TABLE `pr2_standard_tasks`
  DROP `type`,
  DROP `daily`;";

$updates['201310041023'][]="";//was ALTER TABLE `pr2_hours` DROP `internal_fee`
$updates['201310041023'][]="ALTER TABLE  `pr2_hours` CHANGE  `external_fee`  `external_value` DOUBLE NOT NULL DEFAULT  '0'";

$updates['201310041023'][]="ALTER TABLE `pr2_expense_budgets`
  DROP `expense_type_id`,
  DROP `supplier_company_id`;";
	
$updates['201310041023'][]="ALTER TABLE `pr2_expenses`
  DROP `expense_type_id`;";
	
$updates['201310041023'][]="ALTER TABLE `pr2_expense_budgets` DROP `vat`";
	
$updates['201310041023'][]="ALTER TABLE  `pr2_projects` CHANGE  `units_budget`  `budget` DOUBLE NOT NULL DEFAULT  '0'";

$updates['201310041023'][]="ALTER TABLE `pr2_templates` DROP `show_in_tree`";


$updates['201310041023'][]="CREATE TABLE IF NOT EXISTS `pr2_tasks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `project_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `percentage_complete` tinyint(4) NOT NULL,
  `duration` double NOT NULL,
  `due_date` int(11) NOT NULL,
  `description` varchar(255) NOT NULL,
	`sort_order` INT NOT NULL DEFAULT  '0',
  PRIMARY KEY (`id`),
  KEY `project_id` (`project_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;";


$updates['201310041023'][]="ALTER TABLE  `pr2_hours` ADD  `task_id` INT NOT NULL DEFAULT  '0'";
$updates['201310041023'][]="ALTER TABLE `pr2_mileage_registrations` DROP `timeentry_id`";
$updates['201310041023'][]="ALTER TABLE  `pr2_mileage_registrations` ADD  `date` INT NOT NULL";

$updates['201310041023'][]="ALTER TABLE  `pr2_employees` CHANGE  `id`  `user_id` INT( 11 ) NOT NULL";

$updates['201310071023'][]="ALTER TABLE  `pr2_tasks` CHANGE  `due_date`  `due_date` INT( 11 ) NULL";

$updates['201310101023'][]="ALTER TABLE  `pr2_tasks` ADD  `parent_id` INT NOT NULL DEFAULT  '0',
ADD  `has_children` BOOLEAN NOT NULL DEFAULT FALSE";

$updates['201310101023'][]="ALTER TABLE  `pr2_tasks` CHANGE  `sort_order`  `sort_order` INT( 11 ) NULL DEFAULT NULL";
$updates['201310101023'][]="ALTER TABLE  `pr2_hours` ADD  `travel_distance` FLOAT NOT NULL DEFAULT  '0'";

$updates['201310101023'][]="ALTER TABLE  `pr2_hours` ADD  `travel_costs` DOUBLE NOT NULL DEFAULT  '0'";

$updates['201310101023'][]="ALTER TABLE  `pr2_projects` ADD  `travel_costs` DOUBLE NOT NULL DEFAULT  '0'";


$updates['201310151023'][]="ALTER TABLE  `pr2_projects` CHANGE  `parent_project_id`  `parent_project_id` INT( 11 ) NOT NULL DEFAULT  '0'";



$updates['201312171151'][]="ALTER TABLE  `pr2_hours` CHANGE  `fee`  `external_fee` DOUBLE NOT NULL DEFAULT  '0';";
$updates['201312171151'][]="ALTER TABLE  `pr2_hours` ADD  `internal_fee` DOUBLE NOT NULL DEFAULT  '0' AFTER  `external_fee` ;";

	
$updates['201312171151'][]="ALTER TABLE  `pr2_resources` CHANGE  `fee`  `external_fee` DOUBLE NULL DEFAULT  '0';";
$updates['201312171151'][]="ALTER TABLE  `pr2_resources` ADD  `internal_fee` DOUBLE NOT NULL DEFAULT  '0';";
$updates['201312171151'][]="ALTER TABLE  `pr2_employees` CHANGE  `fee`  `external_fee` DOUBLE NOT NULL DEFAULT  '0';";
$updates['201312171151'][]="ALTER TABLE  `pr2_employees` ADD  `internal_fee` DOUBLE NOT NULL DEFAULT  '0';";

$updates['201402141200'][]="ALTER TABLE `pr2_resources` CHANGE `external_value` `external_fee` DOUBLE NULL DEFAULT NULL;";


$updates['201406051455'][]="CREATE TABLE IF NOT EXISTS `pr2_income` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(255) NOT NULL DEFAULT '',
  `amount` DOUBLE NOT NULL,
  `is_invoiced` TINYINT(1) NOT NULL DEFAULT 0,
  `invoice_at` INT(11) NOT NULL,
  `invoice_number` VARCHAR(45) NOT NULL DEFAULT '',
  `type` SMALLINT(2) NOT NULL,
  `project_id` INT(11) NOT NULL,
	`files_folder_id` INT(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`))
ENGINE = InnoDB;";

$updates['201406051455'][]="ALTER TABLE `pr2_standard_tasks` ADD COLUMN `is_billable` TINYINT(1) NOT NULL DEFAULT 1 AFTER `disabled`;";

$updates['201406061200'][]="script:budget_to_income.php";
$updates['201406061201'][]="ALTER TABLE `pr2_projects` DROP COLUMN `budget`;";
$updates['201406061201'][]="ALTER TABLE `pr2_projects` ADD COLUMN `income_type` SMALLINT(2) NOT NULL DEFAULT 1 AFTER `path`;";

$updates['201406121201'][]="ALTER TABLE `pr2_hours` CHANGE COLUMN `invoice_id` `income_id` INT(11) NULL ;";
$updates['201406121201'][]="ALTER TABLE `pr2_hours` DROP COLUMN `payout_invoice_id`, DROP INDEX `payout_invoice_id`;";

$updates['201406221201'][]="UPDATE `pr2_hours` SET income_id=NULL WHERE income_id=0;";

$updates['201406240000'][]="";

$updates['201406241218'][]="ALTER TABLE `pr2_projects` ADD COLUMN `acl_id` INT(11) NOT NULL AFTER `user_id`;";
$updates['201406241218'][]="UPDATE pr2_projects INNER JOIN pr2_types ON (pr2_projects.type_id = pr2_types.id) SET pr2_projects.acl_id = pr2_types.acl_id;";

$updates['201407090845'][]="ALTER TABLE `pr2_statuses` CHANGE `show_in_tree` `show_in_tree_and_filter` TINYINT( 1 ) NOT NULL DEFAULT '1';";

$updates['201407281030'][]="script:2_enable_income_in_project_templates.php";
$updates['201407290940'][]="ALTER TABLE `pr2_projects` ADD `reference_no` VARCHAR( 64 ) NOT NULL DEFAULT '';";
$updates['201407291015'][]="ALTER TABLE `pr2_income` ADD `reference_no` VARCHAR( 64 ) NOT NULL DEFAULT '';";

$updates['201407291200'][]="ALTER TABLE `pr2_expense_budgets` CHANGE `budget_category_id` `budget_category_id` INT( 11 ) NULL DEFAULT NULL ;";

$updates['201408041215'][]="script:3_enable_tasks_panel_in_project_templates.php";
$updates['201408041300'][]="script:4_enable_reference_no_in_project_templates.php";

$updates['201408210940'][]="ALTER TABLE `pr2_standard_tasks` ADD `is_always_billable` TINYINT(1) NOT NULL DEFAULT 0;";

$updates['201408211340'][]="ALTER TABLE `pr2_expense_budgets` ADD `comments` VARCHAR(1024) NOT NULL DEFAULT '';";
$updates['201408271040'][]="ALTER TABLE `pr2_statuses` ADD `not_for_postcalculation` TINYINT( 1 ) NOT NULL DEFAULT '0' AFTER `show_in_tree_and_filter`;";

$updates['201408281515'][]="ALTER TABLE `pr2_expense_budgets` ADD `id_number` VARCHAR( 16 ) NOT NULL DEFAULT '';";

$updates['201409011615'][]="ALTER TABLE `pr2_income` ADD `period_start` INT( 11 ) NOT NULL DEFAULT '0' AFTER `is_invoiced` ;";
$updates['201409011700'][]="ALTER TABLE `pr2_income` ADD `period_end` INT( 11 ) NOT NULL DEFAULT '0' AFTER `period_start` ;";

$updates['201409031045'][]="UPDATE `pr2_income` SET `period_end`=`invoice_at`;";
$updates['201409100940'][]="ALTER TABLE `pr2_income` ADD `files_folder_id` INT( 11 ) NOT NULL DEFAULT '0';";

$updates['201409160930'][]="ALTER TABLE `pr2_income` ADD `comments` TEXT;";

$updates['201410201415'][]="UPDATE `pr2_templates_events` SET type='job' WHERE type='task';";

$updates['201411071127'][]="CREATE TABLE IF NOT EXISTS `pr2_default_resources` (
  `template_id` int(11) NOT NULL DEFAULT '0',
  `user_id` int(11) NOT NULL,
  `budgeted_units` double NOT NULL DEFAULT '0',
  `external_fee` double NOT NULL DEFAULT '0',
  `internal_fee` double NOT NULL DEFAULT '0',
  PRIMARY KEY (`template_id`,`user_id`),
  KEY `fk_pm_user_fees_pm_templates1_idx` (`template_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;";

$updates['201411111212'][]="ALTER TABLE `pr2_statuses` CHANGE `show_in_tree_and_filter` `show_in_tree` TINYINT( 1 ) NOT NULL DEFAULT '1';";

$updates['201411121030'][]="ALTER TABLE `pr2_resources` ADD `apply_internal_overtime` BOOLEAN NOT NULL DEFAULT '0', ADD `apply_external_overtime` BOOLEAN NOT NULL DEFAULT '0';";
$updates['201411121030'][]="ALTER TABLE `pr2_default_resources` ADD `apply_internal_overtime` BOOLEAN NOT NULL DEFAULT '0' , ADD `apply_external_overtime` BOOLEAN NOT NULL DEFAULT '0' ;";
$updates['201411241230'][]="ALTER TABLE `pr2_resources` CHANGE `apply_internal_overtime` `apply_internal_overtime` TINYINT(1) NOT NULL DEFAULT '0';";
$updates['201411241230'][]="ALTER TABLE `pr2_resources` CHANGE `apply_external_overtime` `apply_external_overtime` TINYINT(1) NOT NULL DEFAULT '0';";
$updates['201411241230'][]="ALTER TABLE `pr2_default_resources` CHANGE `apply_internal_overtime` `apply_internal_overtime` TINYINT(1) NOT NULL DEFAULT '0';";
$updates['201411241230'][]="ALTER TABLE `pr2_default_resources` CHANGE `apply_external_overtime` `apply_external_overtime` TINYINT(1) NOT NULL DEFAULT '0';";


$updates['201504021330'][]="ALTER TABLE `pr2_income` ADD `is_contract` BOOLEAN NOT NULL DEFAULT FALSE , ADD `contract_repeat_amount` INT NOT NULL DEFAULT '1' , ADD `contract_repeat_freq` VARCHAR(10) NOT NULL DEFAULT '' , ADD `contract_end` INT NOT NULL DEFAULT '0' ;";
$updates['201504071100'][]="ALTER TABLE `pr2_income` ADD `contract_end_notification_days` INT NOT NULL DEFAULT '10' , ADD `contract_end_notification_active` BOOLEAN NOT NULL , ADD `contract_end_notification_template` INT NULL DEFAULT NULL ;";
$updates['201504071500'][]="ALTER TABLE `pr2_income` ADD `contract_end_notification_sent` INT NULL DEFAULT NULL ;";
$updates['201504131330'][]="script:5_install_income_notification_cron.php";

$updates['201505071028'][]="ALTER TABLE `pr2_expense_budgets` 
		ADD `quantity` FLOAT NOT NULL DEFAULT '1', 
		ADD `unit_type` VARCHAR(50) NOT NULL DEFAULT '', 
		ADD `contact_id` INT NULL DEFAULT NULL ;";
// supplier_company_id & vat might exist in some clean installs
$updates['201505071029'][]="ALTER TABLE `pr2_expense_budgets` ADD `supplier_company_id` INT NULL DEFAULT NULL;";
$updates['201505071030'][]="ALTER TABLE `pr2_expense_budgets` ADD `vat` DOUBLE NOT NULL DEFAULT '0';";
$updates['201506011335'][]="ALTER TABLE `pr2_income` ADD `invoiceable` TINYINT(1) NOT NULL DEFAULT 0;";

$updates['201510090855'][]="update pr2_projects set name = replace(name, '/','-')";

$updates['201511250855'][]="ALTER TABLE `pr2_templates` ADD `use_name_template` BOOLEAN NOT NULL DEFAULT FALSE, ADD `name_template` VARCHAR(80) NOT NULL AFTER `use_name_template`;";

$updates['201601041345'][]="ALTER TABLE `pr2_tasks` CHANGE `percentage_complete` `percentage_complete` TINYINT(4) NOT NULL DEFAULT '0';";

// fix the contacts where the company is not set by the interface bug
$updates['201602121200'][] = "UPDATE  `pr2_projects` JOIN `ab_contacts` ON `ab_contacts`.`id` = `pr2_projects`.`contact_id` SET `pr2_projects`.`company_id` = `ab_contacts`.`company_id` WHERE `pr2_projects`.`company_id` = 0 AND `pr2_projects`.`contact_id` != 0 AND `ab_contacts`.`company_id` != 0 ";

$updates['201606020901'][] = "ALTER TABLE `pr2_statuses` ADD COLUMN `make_invoiceable` TINYINT(1) NOT NULL DEFAULT 0 AFTER `show_in_tree`;";
$updates['201606020902'][] = "ALTER TABLE `pr2_income` ADD COLUMN `paid_at` INT(11) NULL AFTER `period_end`;";
$updates['201606020903'][] = "ALTER TABLE `pr2_templates` ADD COLUMN `default_income_email_template` INT(11) NULL DEFAULT NULL AFTER `name_template`;";




$updates['201610281650'][] = 'SET foreign_key_checks = 0;';

$updates['201610281650'][] = 'ALTER TABLE `cf_pr2_hours` ENGINE=InnoDB;';
$updates['201610281650'][] = 'ALTER TABLE `cf_pr2_hours` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;';
$updates['201610281650'][] = 'ALTER TABLE `cf_pr2_projects` ENGINE=InnoDB;';
$updates['201610281650'][] = 'ALTER TABLE `cf_pr2_projects` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;';

$updates['201610281650'][] = 'ALTER TABLE `go_links_pr2_projects` ENGINE=InnoDB;';
$updates['201610281650'][] = 'ALTER TABLE `go_links_pr2_projects` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;';


$updates['201610281650'][] = 'ALTER TABLE `pr2_default_resources` ENGINE=InnoDB;';
$updates['201610281650'][] = 'ALTER TABLE `pr2_default_resources` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;';
$updates['201610281650'][] = '';
$updates['201610281650'][] = '';
$updates['201610281650'][] = 'ALTER TABLE `pr2_employees` ENGINE=InnoDB;';
$updates['201610281650'][] = 'ALTER TABLE `pr2_employees` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;';
$updates['201610281650'][] = 'ALTER TABLE `pr2_expense_budgets` ENGINE=InnoDB;';
$updates['201610281650'][] = 'ALTER TABLE `pr2_expense_budgets` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;';
$updates['201610281650'][] = 'ALTER TABLE `pr2_expenses` ENGINE=InnoDB;';
$updates['201610281650'][] = 'ALTER TABLE `pr2_expenses` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;';
$updates['201610281650'][] = 'ALTER TABLE `pr2_hours` ENGINE=InnoDB;';
$updates['201610281650'][] = 'ALTER TABLE `pr2_hours` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;';
$updates['201610281650'][] = 'ALTER TABLE `pr2_income` ENGINE=InnoDB;';
$updates['201610281650'][] = 'ALTER TABLE `pr2_income` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;';
$updates['201610281650'][] = 'ALTER TABLE `pr2_portlet_statuses` ENGINE=InnoDB;';
$updates['201610281650'][] = 'ALTER TABLE `pr2_portlet_statuses` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;';
$updates['201610281650'][] = 'ALTER TABLE `pr2_projects` ENGINE=InnoDB;';
$updates['201610281650'][] = 'ALTER TABLE `pr2_projects` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;';
$updates['201610281650'][] = 'ALTER TABLE `pr2_resources` ENGINE=InnoDB;';
$updates['201610281650'][] = 'ALTER TABLE `pr2_resources` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;';
$updates['201610281650'][] = 'ALTER TABLE `pr2_standard_tasks` ENGINE=InnoDB;';
$updates['201610281650'][] = 'ALTER TABLE `pr2_standard_tasks` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;';
$updates['201610281650'][] = 'ALTER TABLE `pr2_statuses` ENGINE=InnoDB;';
$updates['201610281650'][] = 'ALTER TABLE `pr2_statuses` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;';
$updates['201610281650'][] = 'ALTER TABLE `pr2_tasks` ENGINE=InnoDB;';
$updates['201610281650'][] = 'ALTER TABLE `pr2_tasks` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;';
$updates['201610281650'][] = 'ALTER TABLE `pr2_template_tabs` ENGINE=InnoDB;';
$updates['201610281650'][] = 'ALTER TABLE `pr2_template_tabs` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;';
$updates['201610281650'][] = 'ALTER TABLE `pr2_template_tabs_cf` ENGINE=InnoDB;';
$updates['201610281650'][] = 'ALTER TABLE `pr2_template_tabs_cf` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;';
$updates['201610281650'][] = 'ALTER TABLE `pr2_templates` ENGINE=InnoDB;';
$updates['201610281650'][] = 'ALTER TABLE `pr2_templates` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;';
$updates['201610281650'][] = 'ALTER TABLE `pr2_templates_events` ENGINE=InnoDB;';
$updates['201610281650'][] = 'ALTER TABLE `pr2_templates_events` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;';
$updates['201610281650'][] = 'ALTER TABLE `pr2_timers` ENGINE=InnoDB;';
$updates['201610281650'][] = 'ALTER TABLE `pr2_timers` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;';
$updates['201610281650'][] = 'ALTER TABLE `pr2_types` ENGINE=InnoDB;';
$updates['201610281650'][] = 'ALTER TABLE `pr2_types` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;';

$updates['201610281659'][] = 'SET foreign_key_checks = 1;';
$updates['201610281659'][] = "ALTER TABLE `pr2_projects` CHANGE `customer` `customer` VARCHAR(201) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT '';";

$updates['201709141527'][] = "ALTER TABLE `pr2_income` CHANGE `paid_at` `paid_at` INT(11) NOT NULL DEFAULT '0';";
$updates['201710201415'][] = "ALTER TABLE `pr2_templates_events` ADD COLUMN `for_manager` TINYINT(1) NOT NULL DEFAULT 0 AFTER `template_id`;";

$updates['201711071645'][] = "CREATE TABLE `pr2_income_items` (
  `id` int(11) NOT NULL,
  `income_id` int(11) NOT NULL,
  `amount` double NOT NULL DEFAULT '0',
  `description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;";
$updates['201711071646'][] = "ALTER TABLE `pr2_income_items` ADD PRIMARY KEY (`id`);";
$updates['201711071647'][] = "ALTER TABLE `pr2_income_items` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;";
$updates['201711071648'][]="INSERT INTO `pr2_income_items` (`income_id`, `amount`, `description`) SELECT `id`,`amount`,`description` from `pr2_income`;";
// this field was missing from install query try to add again
$updates['201801021137'][] = "ALTER TABLE `pr2_templates_events` ADD COLUMN `for_manager` TINYINT(1) NOT NULL DEFAULT 0 AFTER `template_id`;";

$updates['201801311207'][] = "ALTER TABLE `pr2_income` ADD `contact` VARCHAR(190) NULL DEFAULT NULL AFTER `contract_end_notification_sent`;";

$updates['201802081600'][] = "CREATE TABLE `pr2_employee_activity_rate` (
  `activity_id` INT NOT NULL,
  `employee_id` INT NOT NULL,
  `external_rate` FLOAT NOT NULL,
  PRIMARY KEY (`activity_id`, `employee_id`),
  INDEX `fk_pr2_employee_activity_idx` (`employee_id` ASC),
  CONSTRAINT `fk_pr2_employee_activity`
    FOREIGN KEY (`employee_id`)
    REFERENCES `pr2_employees` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION);
";
$updates['201802081601'][] = "CREATE TABLE `pr2_resource_activity_rate` (
  `activity_id` INT NOT NULL,
  `employee_id` INT NOT NULL,
  `project_id` INT NOT NULL,
  `external_rate` FLOAT NOT NULL,
  PRIMARY KEY (`activity_id`, `employee_id`, `project_id`),
  INDEX `fk_pr2_resource_activity_idx` (`project_id` ASC, `employee_id` ASC),
  CONSTRAINT `fk_pr2_resource_activity`
    FOREIGN KEY (`project_id`, `employee_id`)
    REFERENCES `pr2_resources` (`project_id`, `user_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION);";


$updates['201810161450'][] = "ALTER TABLE `cf_pr2_projects` CHANGE `model_id` `id` INT(11) NOT NULL;";
$updates['201810161450'][] = "RENAME TABLE `cf_pr2_projects` TO `pr2_projects_custom_fields`;";
$updates['201810161450'][] = "delete from pr2_projects_custom_fields where id not in (select id from pr2_projects);";
$updates['201810161450'][] = "ALTER TABLE `pr2_projects_custom_fields` ADD FOREIGN KEY (`id`) REFERENCES `pr2_projects`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;";


$updates['201810161450'][] = "ALTER TABLE `cf_pr2_hours` CHANGE `model_id` `id` INT(11) NOT NULL;";
$updates['201810161450'][] = "RENAME TABLE `cf_pr2_hours` TO `pr2_hours_custom_fields`;";
$updates['201810161450'][] = "delete from pr2_hours_custom_fields where id not in (select id from pr2_hours);";
$updates['201810161450'][] = "ALTER TABLE `pr2_hours_custom_fields` ADD FOREIGN KEY (`id`) REFERENCES `pr2_hours`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;";


$updates['201903291350'][] = function() {	
	$m = new \go\core\install\MigrateCustomFields63to64();
	$m->migrateEntity("Project");	
	$m->migrateEntity("TimeEntry");	
};


$updates['201903291350'][] = function() {
	$m = new go\modules\community\addressbook\install\Migrate63to64();
	$increment = $m->getCompanyIdIncrement();
	\go()->getDbConnection()->update('pr2_projects', [
			'company_id' => new \go\core\db\Expression('company_id + '.$increment)
			], 
					'company_id > 0 AND company_id IS NOT NULL')
					->execute();
	
	
		\go()->getDbConnection()->update('pr2_expense_budgets', [
			'supplier_company_id' => new \go\core\db\Expression('supplier_company_id + '.$increment)
			], 
					'supplier_company_id > 0 AND supplier_company_id IS NOT NULL')
					->execute();
};


$updates['201910231154'][] = "ALTER TABLE `pr2_projects` CHANGE `contact_id` `contact_id` INT(11) NULL DEFAULT NULL;";
$updates['201910231154'][] = "update pr2_projects set contact_id = null where contact_id not in (select id from addressbook_contact);";
$updates['201910231154'][] = "ALTER TABLE `pr2_projects` ADD FOREIGN KEY (`contact_id`) REFERENCES `addressbook_contact`(`id`) ON DELETE SET NULL ON UPDATE RESTRICT;";

$updates['201910231154'][] = "ALTER TABLE `pr2_projects` CHANGE `company_id` `company_id` INT(11) NULL DEFAULT NULL;";
$updates['201910231154'][] = "update pr2_projects set company_id = null where company_id not in (select id from addressbook_contact);";
$updates['201910231154'][] = "ALTER TABLE `pr2_projects` ADD FOREIGN KEY (`company_id`) REFERENCES `addressbook_contact`(`id`) ON DELETE SET NULL ON UPDATE RESTRICT;";

$updates['201910231154'][] = "ALTER TABLE `pr2_expense_budgets` CHANGE `contact_id` `contact_id` INT(11) NULL DEFAULT NULL;";
$updates['201910231154'][] = "update pr2_expense_budgets set contact_id = null where contact_id not in (select id from addressbook_contact);";
$updates['201910231154'][] = "ALTER TABLE `pr2_expense_budgets` ADD FOREIGN KEY (`contact_id`) REFERENCES `addressbook_contact`(`id`) ON DELETE SET NULL ON UPDATE RESTRICT;";

$updates['201911281651'][] = "ALTER TABLE `pr2_templates` ADD `show_in_tree` BOOLEAN NOT NULL DEFAULT FALSE AFTER `name_template`;";
$updates['201911281651'][] = "update `pr2_templates` set show_in_tree=true where project_type != 1;";
