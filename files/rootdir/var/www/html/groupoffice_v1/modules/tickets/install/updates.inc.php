<?php
$updates["201108131024"][]="CREATE TABLE IF NOT EXISTS `ti_groups` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`name` varchar(50) NOT NULL,
	`acl_id` int(11) NOT NULL,
	PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;";

$updates["201108131024"][]="ALTER TABLE `ti_tickets` ADD `group_id` int(11) NOT NULL default '0'; ";

$updates["201108131024"][]="ALTER TABLE `ti_rates` ADD `company_id` INT( 11 ) NOT NULL default '0'; ";

$updates["201109061711"][]="ALTER TABLE `ti_groups` ADD `company_id` int(11) NOT NULL default '0'; ";

$updates["201109070947"][]="ALTER TABLE `ti_rates` CHANGE `id` `id` int(11) NOT NULL AUTO_INCREMENT";

$updates["201109071316"][]="RENAME TABLE `go_links_20` TO `go_links_ti_tickets`;";
$updates["201109071316"][]="ALTER TABLE `go_links_ti_tickets` CHANGE `link_id` `model_id` INT( 11 ) NOT NULL";
$updates["201109071316"][]="ALTER TABLE `go_links_ti_tickets` CHANGE `link_type` `model_type_id` INT( 11 ) NOT NULL";

$updates["201109071316"][]="ALTER TABLE `cf_20` CHANGE `link_id` `model_id` INT( 11 ) NOT NULL DEFAULT '0'";
$updates["201109071316"][]="RENAME TABLE `cf_20` TO `cf_ti_tickets` ;";


$updates["201108301656"][]="INSERT INTO `go_model_types` (
`id` ,
`model_name`
)
VALUES (
'20', 'GO_Tickets_Model_Ticket'
);";




$updates["201110031400"][]="ALTER TABLE `ti_tickets` CHANGE `files_folder_id` `files_folder_id` INT( 11 ) NOT NULL DEFAULT '0'";
$updates["201110031400"][]="ALTER TABLE `ti_tickets` CHANGE `ticket_verifier` `ticket_verifier` INT( 11 ) NOT NULL DEFAULT '0'";
$updates["201110031400"][]="ALTER TABLE `ti_tickets` CHANGE `id` `id` INT( 11 ) NOT NULL AUTO_INCREMENT ";
$updates["201110031400"][]="ALTER TABLE `ti_messages` CHANGE `id` `id` INT( 11 ) NOT NULL AUTO_INCREMENT ";
$updates["201110031400"][]="ALTER TABLE `ti_messages` CHANGE `is_note` `is_note` BOOLEAN NOT NULL DEFAULT '0'";
$updates["201110031400"][]="ALTER TABLE `ti_messages` CHANGE `has_status` `has_status` BOOLEAN NOT NULL DEFAULT '0'";
$updates["201110031400"][]="ALTER TABLE `ti_messages` CHANGE `rate_id` `rate_id` INT( 11 ) NOT NULL DEFAULT '0'";
$updates["201110031400"][]="ALTER TABLE `ti_messages` CHANGE `rate_amount` `rate_amount` DOUBLE NOT NULL DEFAULT '0'";
$updates["201110031400"][]="ALTER TABLE `ti_messages` CHANGE `rate_hours` `rate_hours` DOUBLE NOT NULL DEFAULT '0'";
$updates["201110031400"][]="ALTER TABLE `ti_messages` CHANGE `rate_name` `rate_name` VARCHAR( 50 ) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT ''";
$updates["201110031400"][]="ALTER TABLE `ti_messages` CHANGE `attachments` `attachments` VARCHAR( 300 ) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT ''";


$updates["201110141221"][]="UPDATE ti_messages SET is_note=0 where is_note=1";
$updates["201110141221"][]="UPDATE ti_messages SET is_note=1 where is_note=2";


$updates["201110141221"][]="UPDATE ti_messages SET has_status=0 where has_status=1";
$updates["201110141221"][]="UPDATE ti_messages SET has_status=1 where has_status=2";

$updates["201112141221"][]="ALTER TABLE `ti_settings` CHANGE `id` `id` INT( 11 ) NOT NULL AUTO_INCREMENT ";
$updates["201112141221"][]="ALTER TABLE `ti_types` CHANGE `id` `id` INT( 11 ) NOT NULL AUTO_INCREMENT ";
$updates["201112141221"][]="ALTER TABLE `ti_templates` CHANGE `id` `id` INT( 11 ) NOT NULL AUTO_INCREMENT ";
$updates["201112141221"][]="ALTER TABLE `ti_statuses` CHANGE `id` `id` INT( 11 ) NOT NULL AUTO_INCREMENT ";

$updates["201112141221"][]="ALTER TABLE `ti_types` CHANGE `show_external` `show_external` TINYINT( 1 ) NOT NULL DEFAULT '0'";
$updates["201112141221"][]="ALTER TABLE `ti_types` CHANGE `show_from_others` `show_from_others` TINYINT( 1 ) NOT NULL DEFAULT '0'";
$updates["201112141221"][]="ALTER TABLE `ti_types` CHANGE `notify_agents_on_new` `notify_agents_on_new` TINYINT( 1 ) NOT NULL DEFAULT '0'";
$updates["201112141221"][]="ALTER TABLE `ti_types` CHANGE `notify_admin` `notify_admin` TINYINT( 1 ) NOT NULL DEFAULT '0'";

$updates["201112230823"][]="ALTER TABLE `ti_types` ADD `files_folder_id` INT NOT NULL DEFAULT '0'";

$updates["201112230823"][]="ALTER TABLE `ti_templates` CHANGE `autoreply` `autoreply` BOOLEAN NOT NULL DEFAULT '0'";
$updates["201112230823"][]="ALTER TABLE `ti_templates` CHANGE `default_template` `default_template` BOOLEAN NOT NULL DEFAULT '0'";
$updates["201112230823"][]="ALTER TABLE `ti_templates` CHANGE `ticket_created_for_client` `ticket_created_for_client` BOOLEAN NOT NULL DEFAULT '0'";

$updates["201112230823"][]="ALTER TABLE `ti_settings` CHANGE `notify_contact` `notify_contact` BOOLEAN NOT NULL DEFAULT '0'";

$updates["201201161702"][]="ALTER TABLE `ti_tickets` CHANGE `unseen` `unseen` INT( 1 ) NOT NULL DEFAULT '1'";

$updates["201201161702"][]="ALTER TABLE `ti_tickets` CHANGE `agent_id` `agent_id` INT( 11 ) NOT NULL DEFAULT '0'";

$updates["201202021702"][]="ALTER TABLE `ti_settings` ADD `use_alternative_url` BOOLEAN NOT NULL DEFAULT '0'";
$updates["201202021702"][]="ALTER TABLE `ti_settings` CHANGE `extern_url` `alternative_url` VARCHAR( 100 ) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL ";

$updates["201202021702"][]="ALTER TABLE `ti_types`
  DROP `show_external`,
  DROP `notify_agents_on_new`,
	DROP `notify_admin`;";

$updates["201202021702"][]="ALTER TABLE `ti_types` ADD `email_on_new` TEXT NULL ";

$updates["201202081202"][]="ALTER TABLE `ti_tickets` CHANGE `subject` `subject` VARCHAR( 100 ) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL";
$updates["201202091421"][]="ALTER TABLE `ti_tickets` ADD `order_id` INT NOT NULL DEFAULT '0'";

$updates["201203041756"][]="ALTER TABLE `ti_settings` CHANGE `alternative_url` `alternative_url` VARCHAR( 255 ) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT ''";

$updates["201203041756"][]="ALTER TABLE `ti_types` ADD `email_to_agent` BOOLEAN NOT NULL DEFAULT '0'";

$updates["201203190800"][]="ALTER TABLE `ti_tickets` CHANGE `company` `company` VARCHAR( 100 ) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT ''";
$updates["201203190800"][]="ALTER TABLE `ti_tickets` CHANGE `company_id` `company_id` INT( 11 ) NOT NULL DEFAULT '0'";

$updates["201204101405"][]="script:1_convert_agent_permissions.php";

$updates["201204101405"][]="ALTER TABLE `ti_types` ADD `description` VARCHAR( 255 ) NOT NULL";

$updates["201206250935"][]="update ti_templates set default_template=0 where autoreply=1 and default_template=1;";
$updates["201206250935"][]="update ti_templates set autoreply=0 where autoreply=1 and ticket_created_for_client=1;";

$updates["201210051319"][]="ALTER TABLE `ti_settings` ADD `never_close_status_id` INT( 11 ) NULL";

$updates["201210291300"][]="ALTER TABLE `ti_types` ADD `custom_sender_field` TINYINT(1) NOT NULL DEFAULT '0';";
$updates["201210291300"][]="ALTER TABLE `ti_types` ADD `sender_name` varchar(64);";
$updates["201210291300"][]="ALTER TABLE `ti_types` ADD `sender_email` varchar(128);";

$updates["201211071450"][]="ALTER TABLE `ti_tickets` CHANGE `company` `company` VARCHAR( 100 ) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT ''";
$updates["201211071450"][]="ALTER TABLE `ti_tickets` CHANGE `company_id` `company_id` INT( 11 ) NOT NULL DEFAULT '0'";
$updates["201211071450"][]="ALTER TABLE `ti_tickets` CHANGE `first_name` `first_name` VARCHAR( 50 ) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL ";
$updates["201211071450"][]="ALTER TABLE `ti_tickets` CHANGE `middle_name` `middle_name` VARCHAR( 100 ) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT ''";
$updates["201211071450"][]="ALTER TABLE `ti_tickets` CHANGE `last_name` `last_name` VARCHAR( 50 ) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT ''";
$updates["201211071450"][]="ALTER TABLE `ti_tickets` CHANGE `email` `email` VARCHAR( 100 ) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL ";
$updates["201211071450"][]="ALTER TABLE `ti_tickets` CHANGE `phone` `phone` VARCHAR( 20 ) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT ''";
$updates["201211071450"][]="ALTER TABLE `ti_tickets` CHANGE `subject` `subject` VARCHAR( 100 ) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL ";

$updates["201211211450"][]="ALTER TABLE `ti_types` ADD `publish_on_site` BOOLEAN NOT NULL DEFAULT '0';";

$updates["201303291347"][]="script:2_install_cron.php";

$updates['201304231330'][]="ALTER TABLE `ti_tickets` ADD `muser_id` int(11) NOT NULL DEFAULT '0';";

$updates["201304242305"][]="ALTER TABLE ti_templates ADD `ticket_mail_for_agent` TINYINT(1) NOT NULL DEFAULT '0';";
$updates["201304242305"][]="script:3_install_agent_email_template.php";

$updates["201304300029"][]="ALTER TABLE ti_templates ADD `ticket_claim_notification` TINYINT(1) NOT NULL DEFAULT '0';";
$updates["201304300029"][]="script:4_install_agent_claim_template.php";

$updates["201304302356"][]="ALTER TABLE `ti_tickets` ADD `last_response_time` int(11) NOT NULL DEFAULT '0';";

$updates["201305022250"][]="ALTER TABLE `ti_settings` ADD `disable_reminder_assigned` BOOLEAN NOT NULL DEFAULT '0'";
$updates["201305022250"][]="ALTER TABLE `ti_settings` ADD `disable_reminder_unanswered` BOOLEAN NOT NULL DEFAULT '0'";

$updates["201305022250"][]="UPDATE `ti_tickets` set last_response_time=mtime;";

$updates["201305281530"][]="ALTER TABLE `ti_settings` ADD `enable_external_page` BOOLEAN NOT NULL DEFAULT FALSE ,
ADD `allow_anonymous` BOOLEAN NOT NULL DEFAULT FALSE ,
ADD `external_page_css` TEXT NULL";


$updates["201305281530"][]="ALTER TABLE  `ti_settings` ADD  `email_account_id` INT NOT NULL DEFAULT  '0'";

$updates["201306041103"][] ="CREATE TABLE IF NOT EXISTS `ti_type_groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `sort_index` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;";

$updates["201306041104"][] ="ALTER TABLE  `ti_types` ADD  `type_group_id` INT NULL DEFAULT NULL;";


$updates["201306061202"][] ="delete from go_state where name='ti-types-grid'";


$updates["201310301030"][]="ALTER TABLE  `ti_types` ADD  `email_account_id` INT NOT NULL DEFAULT  '0'";
$updates["201310301430"][]="script:5_move_email_account_to_first_tickettype.php";
$updates["201310301430"][]="ALTER TABLE `ti_settings` DROP `email_account_id`;";

$updates["201311051340"][]="ALTER TABLE `ti_rates` ADD `cost_code` VARCHAR( 50 ) NULL DEFAULT NULL ;";

$updates["201311051440"][]="ALTER TABLE `ti_messages` ADD `rate_cost_code` VARCHAR( 50 ) NULL DEFAULT NULL ;";


$updates["201311211000"][]="ALTER TABLE `ti_tickets` ADD `cc_addresses` varchar(255) NOT NULL DEFAULT '';";

$updates["201402141615"][]="ALTER TABLE `ti_messages` ADD `type_id` int(11) NOT NULL;";

$updates["201402141615"][]="ALTER TABLE `ti_messages` ADD	`has_type` tinyint(1) NOT NULL DEFAULT '0';";
$updates["201402171115"][]="ALTER TABLE `ti_settings` ADD `leave_type_blank_by_default` tinyint(1) NOT NULL DEFAULT '0';";
$updates["201402191615"][]="ALTER TABLE  `ti_messages` CHANGE  `type_id`  `type_id` INT( 11 ) NOT NULL DEFAULT  '0';";


$updates["201402211446"][]="ALTER TABLE `ti_tickets` ADD `cc_addresses` varchar(255) NOT NULL DEFAULT '';";

$updates["201404141429"][]="ALTER TABLE `ti_settings` ADD `leave_type_blank_by_default` tinyint(1) NOT NULL DEFAULT '0';";

$updates["201404141429"][] ="ALTER TABLE `ti_messages` ADD `template_id` INT NULL DEFAULT NULL";

$updates["201501051325"][] ="ALTER TABLE `ti_messages` CHANGE `attachments` `attachments` VARCHAR(500) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '';";

$updates["201503181400"][]="script:6_remove_ticket_identifier_from_email_subject.php";

$updates["201505031547"][]="UPDATE `ti_messages` m JOIN ti_tickets t ON t.id = m.ticket_id SET m.`type_id` = t.`type_id` WHERE m.`type_id` = 0;";

$updates["201510080915"][]="ALTER TABLE `ti_tickets` CHANGE `cc_addresses` `cc_addresses` varchar(1024) NOT NULL DEFAULT '';";

$updates["201511110915"][]="ALTER TABLE `ti_tickets` ADD `cuser_id` INT NOT NULL DEFAULT '0';";

$updates["201511260915"][]="ALTER TABLE `ti_tickets` ADD `last_agent_response_time` INT(11) NOT NULL DEFAULT '0', ADD `last_contact_response_time` INT(11) NOT NULL DEFAULT '0' AFTER `last_agent_response_time`;";


$updates["201511260919"][]="UPDATE `ti_tickets` SET `last_agent_response_time` = ti_tickets.ctime, `last_contact_response_time` = ti_tickets.ctime";

$updates["201511260920"][]="script:7_set_last_agent_and_contact_response_time.php";



/*
 * Add default notification msg templates
 */
$updates["201604051111"][]="ALTER TABLE `ti_settings` 
	ADD `new_ticket` BOOLEAN NOT NULL DEFAULT FALSE , 
	ADD `new_ticket_msg` TEXT NOT NULL AFTER `new_ticket`, 
	ADD `assigned_to` BOOLEAN NOT NULL DEFAULT FALSE AFTER `new_ticket_msg`, 
	ADD `assigned_to_msg` TEXT NOT NULL AFTER `assigned_to`, 
	ADD `notify_agent` BOOLEAN NOT NULL DEFAULT FALSE AFTER `assigned_to_msg`, 
	ADD `notify_agent_msg` TEXT NOT NULL AFTER `notify_agent`;";

/*
 * Add by type notification msg templates
 */
$updates["201604051111"][]="ALTER TABLE `ti_types` 
	ADD `enable_templates` BOOLEAN NOT NULL DEFAULT FALSE, 
	ADD `new_ticket` BOOLEAN NOT NULL DEFAULT FALSE AFTER `enable_templates`, 
	ADD `new_ticket_msg` TEXT NOT NULL AFTER `new_ticket`, 
	ADD `assigned_to` BOOLEAN NOT NULL DEFAULT FALSE AFTER `new_ticket_msg`, 
	ADD `assigned_to_msg` TEXT NOT NULL AFTER `assigned_to`, 
	ADD `notify_agent` BOOLEAN NOT NULL DEFAULT FALSE AFTER `assigned_to_msg`, 
	ADD `notify_agent_msg` TEXT NOT NULL AFTER `notify_agent`;";



$updates["201604071211"][]="UPDATE `ti_settings` SET `new_ticket`=1, `new_ticket_msg` = (SELECT `content` FROM `ti_templates` WHERE `autoreply` = 1 LIMIT 1) WHERE `id` = 1 "; 

$updates["201604071212"][]="UPDATE `ti_settings` SET `assigned_to`=1, `assigned_to_msg` = (SELECT `content` FROM `ti_templates` WHERE `ticket_claim_notification` = 1 LIMIT 1) WHERE `id` = 1 ";

$updates["201604071213"][]="UPDATE `ti_settings` SET `notify_agent`=1, `notify_agent_msg` = (SELECT `content` FROM `ti_templates` WHERE `ticket_mail_for_agent` = 1 LIMIT 1) WHERE `id` = 1 "; 

$updates["201604071613"][]="UPDATE `ti_settings` SET `new_ticket`=0 WHERE `id` = 1 AND `new_ticket_msg` = '' "; 
$updates["201604071613"][]="UPDATE `ti_settings` SET `assigned_to_msg`=0 WHERE `id` = 1 AND `assigned_to_msg` = '' "; 
$updates["201604071613"][]="UPDATE `ti_settings` SET `notify_agent`=0 WHERE `id` = 1 AND `notify_agent_msg` = '' "; 

$updates['201605011655'][]="ALTER TABLE `ti_types` ADD `search_cache_acl_id` INT NOT NULL DEFAULT 0;";
				
$updates["201607181125"][]="ALTER TABLE `ti_tickets` CHANGE `phone` `phone` VARCHAR(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '';";


$updates['201609271055'][]="ALTER TABLE `ti_types` ADD `email_on_new_msg` TEXT NULL;";
$updates['201609271055'][]="UPDATE `ti_types` SET `email_on_new_msg` = '{MESSAGE}';";
$updates["201609271055"][]="UPDATE `ti_types` SET `email_on_new_msg` = (select content from ti_templates where ticket_mail_for_agent=1 limit 0,1);"; 

$updates["201610261545"][]="ALTER TABLE `ti_settings` ADD `manager_reopen_ticket_only` tinyint(1) NOT NULL DEFAULT '0';";


$updates['201610281650'][] = 'SET foreign_key_checks = 0;';

$updates['201610281650'][] = 'ALTER TABLE `cf_ti_tickets` ENGINE=InnoDB;';
$updates['201610281650'][] = 'ALTER TABLE `cf_ti_tickets` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;';
$updates['201610281650'][] = 'ALTER TABLE `go_links_ti_tickets` ENGINE=InnoDB;';
$updates['201610281650'][] = 'ALTER TABLE `go_links_ti_tickets` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;';

$updates['201610281650'][] = 'ALTER TABLE `ti_groups` ENGINE=InnoDB;';
$updates['201610281650'][] = 'ALTER TABLE `ti_groups` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;';
$updates['201610281650'][] = 'ALTER TABLE `ti_messages` ENGINE=InnoDB;';
$updates['201610281650'][] = 'ALTER TABLE `ti_messages` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;';
$updates['201610281650'][] = 'ALTER TABLE `ti_rates` ENGINE=InnoDB;';
$updates['201610281650'][] = 'ALTER TABLE `ti_rates` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;';
$updates['201610281650'][] = 'ALTER TABLE `ti_settings` ENGINE=InnoDB;';
$updates['201610281650'][] = 'ALTER TABLE `ti_settings` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;';
$updates['201610281650'][] = 'ALTER TABLE `ti_statuses` ENGINE=InnoDB;';
$updates['201610281650'][] = 'ALTER TABLE `ti_statuses` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;';
$updates['201610281650'][] = 'ALTER TABLE `ti_templates` ENGINE=InnoDB;';
$updates['201610281650'][] = 'ALTER TABLE `ti_templates` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;';
$updates['201610281650'][] = 'ALTER TABLE `ti_tickets` ENGINE=InnoDB;';
$updates['201610281650'][] = 'ALTER TABLE `ti_tickets` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;';
$updates['201610281650'][] = 'ALTER TABLE `ti_type_groups` ENGINE=InnoDB;';
$updates['201610281650'][] = 'ALTER TABLE `ti_type_groups` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;';
$updates['201610281650'][] = 'ALTER TABLE `ti_types` ENGINE=InnoDB;';
$updates['201610281650'][] = 'ALTER TABLE `ti_types` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;';


$updates['201610281659'][] = 'SET foreign_key_checks = 1;';

$updates['201705311330'][] = "ALTER TABLE `ti_settings` ADD `show_close_confirm` tinyint(1) NOT NULL DEFAULT '0';";

$updates['201805231505'][] = "ALTER TABLE `ti_tickets` ADD COLUMN `due_date` INT NULL AFTER `last_contact_response_time`;";
$updates['201805231505'][] = "ALTER TABLE `ti_tickets` ADD COLUMN `due_reminder_sent` TINYINT(1) NOT NULL DEFAULT 0 AFTER `due_date`;";
$updates['201805231505'][] = "ALTER TABLE `ti_settings` 
ADD COLUMN `notify_due_date` TINYINT NOT NULL DEFAULT 0 AFTER `show_close_confirm`,
ADD COLUMN `notify_due_date_msg` TEXT NOT NULL AFTER `notify_due_date`;";
$updates['201805231505'][] = "UPDATE `ti_settings` SET `notify_due_date_msg` = '{ticket.ticket_number} - {ticket.subject} is due' WHERE `ti_settings`.`id` = 1;";
$updates["201805231506"][]="script:8_install_cron.php";

$updates["201808140934"][] = "ALTER TABLE `ti_messages` CHANGE `attachments` `attachments` TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL;";


// Thnx Michal C.
$updates["201901301035"][] = "ALTER TABLE `ti_tickets` ADD INDEX `unseen_type_id_agent_id` (`unseen`, `type_id`, `agent_id`);";
$updates["201901301035"][] = "ALTER TABLE `ti_types` ADD INDEX `name` (`name`);";


$updates['201901301035'][] = "ALTER TABLE `cf_ti_tickets` CHANGE `model_id` `id` INT(11) NOT NULL;";
$updates['201901301035'][] = "RENAME TABLE `cf_ti_tickets` TO `ti_tickets_custom_fields`;";
$updates['201901301035'][] = "delete from ti_tickets_custom_fields where id not in (select id from ti_tickets);";
$updates['201901301035'][] = "ALTER TABLE `ti_tickets_custom_fields` ADD FOREIGN KEY (`id`) REFERENCES `ti_tickets`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;";


$updates['201901301035'][] = "ALTER TABLE `ti_tickets` CHANGE `company_id` `company_id` INT(11) NULL DEFAULT NULL;";
$updates['201901301035'][] = "ALTER TABLE `ti_tickets` CHANGE `contact_id` `contact_id` INT(11) NULL DEFAULT NULL;";

$updates['201903291350'][] = function() {	
	$m = new \go\core\install\MigrateCustomFields63to64();
	$m->migrateEntity("Ticket");	
};


$updates['201901301035'][] = function() {
	$m = new go\modules\community\addressbook\install\Migrate63to64();
	$increment = $m->getCompanyIdIncrement();
	\go()->getDbConnection()->update('ti_tickets', [
			'company_id' => new \go\core\db\Expression('company_id + '.$increment)
			], 
					'company_id > 0 AND company_id IS NOT NULL')
					->execute();
	
	
		\go()->getDbConnection()->update('ti_groups', [
			'company_id' => new \go\core\db\Expression('company_id + '.$increment)
			], 
					'company_id > 0 AND company_id IS NOT NULL')
					->execute();
		
		\go()->getDbConnection()->update('ti_rates', [
			'company_id' => new \go\core\db\Expression('company_id + '.$increment)
			], 
					'company_id > 0 AND company_id IS NOT NULL')
					->execute();
};

$updates["201912131532"][]="ALTER TABLE `ti_statuses` ADD `type_id` INT NULL AFTER `user_id`;";

//update ti_groups n set company_id = company_id + (select max(id) from ab_contacts);


$updates["202009140947"][]="update core_search s inner join ti_types t on s.aclId=t.acl_id  set s.aclId = t.search_cache_acl_id";