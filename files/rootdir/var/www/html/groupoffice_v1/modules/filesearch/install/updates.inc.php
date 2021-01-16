<?php
$updates["201110171241"][]="ALTER TABLE `fs_filesearch` ADD `acl_id` INT NOT NULL ";
$updates["201110171241"][]="ALTER TABLE `fs_filesearch` CHANGE `author` `author` VARCHAR( 50 ) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT ''";
$updates["201110171241"][]="ALTER TABLE `fs_filesearch` CHANGE `last_modified_by` `last_modified_by` VARCHAR( 50 ) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT ''";
$updates["201110171241"][]="ALTER TABLE `fs_filesearch` CHANGE `extension` `extension` VARCHAR( 4 ) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT ''";
$updates["201110171241"][]="ALTER TABLE `fs_filesearch` CHANGE `subject` `subject` VARCHAR( 100 ) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT ''";
$updates["201110171241"][]="ALTER TABLE `fs_filesearch` CHANGE `to` `to` TEXT CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT ''";

$updates["201110171241"][]="ALTER TABLE `fs_docbundles` CHANGE `id` `id` INT( 11 ) NOT NULL AUTO_INCREMENT";
$updates["201110171241"][]="ALTER TABLE `fs_filesearch` CHANGE `text` `text` LONGTEXT CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT ''";
$updates["201110171241"][]="DROP TABLE `fs_duplicates`";
$updates["201110171241"][]="CREATE TABLE IF NOT EXISTS `fs_duplicates` (
  `user_id` int(11) NOT NULL,
  `file_id` int(11) NOT NULL,
  PRIMARY KEY (`user_id`,`file_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;";

$updates["201110171241"][]="ALTER TABLE `fs_filesearch` CHANGE `extension` `extension` VARCHAR( 20 ) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT ''";
$updates["201203271505"][]="ALTER TABLE `fs_filesearch` DROP `acl_id`";

$updates["201406161227"][]="script:1_install_cron.php";



$updates['201610281650'][] = 'SET foreign_key_checks = 0;';

$updates['201610281650'][] = 'ALTER TABLE `fs_docbundles` ENGINE=InnoDB;';
$updates['201610281650'][] = 'ALTER TABLE `fs_docbundles` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;';
$updates['201610281650'][] = 'ALTER TABLE `fs_docbundles_files` ENGINE=InnoDB;';
$updates['201610281650'][] = 'ALTER TABLE `fs_docbundles_files` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;';
$updates['201610281650'][] = 'ALTER TABLE `fs_duplicates` ENGINE=InnoDB;';
$updates['201610281650'][] = 'ALTER TABLE `fs_duplicates` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;';
$updates['201610281650'][] = 'ALTER TABLE `fs_filesearch` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;';

$updates['201610281659'][] = 'SET foreign_key_checks = 1;';



