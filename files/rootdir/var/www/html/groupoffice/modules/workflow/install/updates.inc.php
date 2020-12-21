<?php
$updates["201203301449"][]="ALTER TABLE `wf_required_approvers` ADD `reminder_id` INT NOT NULL DEFAULT '0';";
$updates["201203301449"][]="ALTER TABLE `wf_models` ADD `user_id` INT NOT NULL;";
$updates["201207091442"][]="ALTER TABLE `wf_models` CHANGE `shift_due_time` `shift_due_time` INT( 11 ) NOT NULL DEFAULT '0'";

$updates["201210260000"][]="CREATE TABLE IF NOT EXISTS `wf_approvers_groups` (
  `step_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;";


$updates["201210261500"][]="ALTER TABLE `wf_steps` ADD `copy_to_folder` varchar(256);";
$updates["201210261500"][]="ALTER TABLE `wf_steps` ADD `keep_original_copy` tinyint(1) NOT NULL DEFAULT '0';";
$updates["201210261600"][]="ALTER TABLE `wf_steps` ADD `action_type_id` int(11) NOT NULL DEFAULT '0';";
$updates["201210261600"][]="CREATE TABLE IF NOT EXISTS `wf_action_types` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`name` varchar(64) NOT NULL DEFAULT 'Approve / Disapprove',
	`class_name` varchar(64) NOT NULL DEFAULT 'GO_Workflow_Action_Approve',
	PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;";
$updates["201211021600"][]="INSERT INTO `wf_action_types` (`id`,`name`,`class_name`) VALUES ('1','Approve only','GO_Workflow_Action_Approve');";
$updates["201211021600"][]="INSERT INTO `wf_action_types` (`id`,`name`,`class_name`) VALUES ('2','Approve, then Copy / Move file','GO_Workflow_Action_Copy');";
$updates["201211021600"][]="INSERT INTO `wf_action_types` (`id`,`name`,`class_name`) VALUES ('3','Approve, then Workflow history in PDF','GO_Workflow_Action_HistoryPdf');";

$updates["201211221300"][]="INSERT INTO `wf_action_types` (`id`,`name`,`class_name`) VALUES ('4','Approve, then Workflow history in copy PDF','GO_Workflow_Action_HistoryPdfInCopy');";

$updates["201211221300"][]="update wf_steps set action_type_id=1;";

$updates['201412051345'][]="UPDATE `wf_action_types` SET class_name='GO\\Workflow\\Action\\Approve' WHERE class_name='GO_Workflow_Action_Approve';";
$updates['201412051345'][]="UPDATE `wf_action_types` SET class_name='GO\\Workflow\Action\Copy' WHERE class_name='GO_Workflow_Action_Copy';";
$updates['201412051345'][]="UPDATE `wf_action_types` SET class_name='GO\\Workflow\Action\\HistoryPdf' WHERE class_name='GO_Workflow_Action_HistoryPdf';";
$updates['201412051345'][]="UPDATE `wf_action_types` SET class_name='GO\\Workflow\\Action\\HistoryPdfInCopy' WHERE class_name='GO_Workflow_Action_HistoryPdfInCopy';";


$updates['201412051345'][]="UPDATE `wf_action_types` SET class_name='GO\\\\Workflow\\\\Action\\\\Approve' WHERE class_name='GOWorkflowActionApprove';";
$updates['201412051345'][]="UPDATE `wf_action_types` SET class_name='GO\\\\Workflow\\\\Action\\\\Copy' WHERE class_name='GOWorkflowActionCopy';";
$updates['201412051345'][]="UPDATE `wf_action_types` SET class_name='GO\\\\Workflow\\\\Action\\\\HistoryPdf' WHERE class_name='GOWorkflowActionHistoryPdf';";
$updates['201412051345'][]="UPDATE `wf_action_types` SET class_name='GO\\\\Workflow\\\\Action\\\\HistoryPdfInCopy' WHERE class_name='GOWorkflowActionHistoryPdfInCopy';";


$updates['201610281650'][] = 'ALTER TABLE `wf_action_types` ENGINE=InnoDB;';
$updates['201610281650'][] = 'ALTER TABLE `wf_action_types` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;';
$updates['201610281650'][] = 'ALTER TABLE `wf_approvers` ENGINE=InnoDB;';
$updates['201610281650'][] = 'ALTER TABLE `wf_approvers` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;';
$updates['201610281650'][] = 'ALTER TABLE `wf_approvers_groups` ENGINE=InnoDB;';
$updates['201610281650'][] = 'ALTER TABLE `wf_approvers_groups` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;';
$updates['201610281650'][] = 'ALTER TABLE `wf_models` ENGINE=InnoDB;';
$updates['201610281650'][] = 'ALTER TABLE `wf_models` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;';
$updates['201610281650'][] = 'ALTER TABLE `wf_processes` ENGINE=InnoDB;';
$updates['201610281650'][] = 'ALTER TABLE `wf_processes` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;';
$updates['201610281650'][] = 'ALTER TABLE `wf_required_approvers` ENGINE=InnoDB;';
$updates['201610281650'][] = 'ALTER TABLE `wf_required_approvers` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;';
$updates['201610281650'][] = 'ALTER TABLE `wf_step_history` ENGINE=InnoDB;';
$updates['201610281650'][] = 'ALTER TABLE `wf_step_history` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;';
$updates['201610281650'][] = 'ALTER TABLE `wf_steps` ENGINE=InnoDB;';
$updates['201610281650'][] = 'ALTER TABLE `wf_steps` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;';
$updates['201610281650'][] = 'ALTER TABLE `wf_triggers` ENGINE=InnoDB;';
$updates['201610281650'][] = 'ALTER TABLE `wf_triggers` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;';
