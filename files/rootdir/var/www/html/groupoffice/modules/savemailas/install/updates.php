<?php
$updates["201108190000"][]="RENAME TABLE `go_links_9` TO `go_links_em_emails`;";
$updates["201108190000"][]="ALTER TABLE `go_links_em_emails` CHANGE `link_id` `model_id` INT( 11 ) NOT NULL";
$updates["201108190000"][]="ALTER TABLE `go_links_em_emails` CHANGE `link_type` `model_type_id` INT( 11 ) NOT NULL";

$updates["201108301656"][]="INSERT INTO `go_model_types` (
`id` ,
`model_name`
)
VALUES (
'9', 'GO_Savemailas_Model_LinkedEmail'
);";


$updates["201110110943"][]="RENAME TABLE `go_links_em_emails` TO `go_links_em_links` ;";
$updates["201110110943"][]="ALTER TABLE `em_links` CHANGE `link_id` `id` INT( 11 ) NOT NULL AUTO_INCREMENT";
$updates["201111101634"][]="ALTER TABLE `em_links` DROP `acl_write`";
$updates["201203300949"][]="ALTER TABLE `em_links` ADD `mtime` INT NOT NULL DEFAULT '0'";

$updates['201809031120'][]="UPDATE `core_entity` SET `name` = 'LinkedEmail', `clientName` = 'LinkedEmail' WHERE `name` = 'linkedEmail'";

$updates['202009140947'][]= function() {
	if(GO::modules()->tickets) {
		go()->getDbConnection()->exec("update em_links e inner join ti_types t on e.acl_id=t.acl_id set e.acl_id = t.search_cache_acl_id;");
		go()->getDbConnection()->exec("update core_search s inner join em_links e on s.entityId=e.id and s.entityTypeId=(select id from core_entity where name='LinkedEmail') set s.aclId = e.acl_id;");
	}
};


$updates['202009281104'][] = "delete el from em_links el where el.id not in (select fromId from core_link l where fromEntityTypeId = (select id from core_entity where name='LinkedEmail')) and el.id not in (select toId from core_link l where toEntityTypeId = (select id from core_entity where name='LinkedEmail')) ;";
$updates['202009281104'][] = "delete s from core_search s where s.entityTypeId = (select id from core_entity where name='LinkedEmail') and s.entityId not in (select id from em_links);";