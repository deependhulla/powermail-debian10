<?php
$updates['201906171103'][] = 'update core_entity set name = "WopiService" where name="Service" and moduleId = (select id from core_module where package="business" and name="wopi")';
$updates['201906171103'][] = 'ALTER TABLE `wopi_service` DROP INDEX `type`;';
$updates['201906171103'][] = 'ALTER TABLE `wopi_service` ADD UNIQUE(`type`);';
$updates['202006251434'][] = 'ALTER TABLE `wopi_service` ADD `wopiClientUri` TEXT NULL DEFAULT NULL AFTER `type`;';
$updates['202012211721'][] = "ALTER TABLE `fs_files` ADD `version` INT UNSIGNED NOT NULL DEFAULT '1' AFTER `content_expire_date`;";
