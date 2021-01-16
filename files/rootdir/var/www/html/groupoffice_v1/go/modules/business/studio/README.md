Upgrade module builder module
=============================

1. Create new studio module. Example "contracts" with entity "Contract".

2. Run SQL script::

        delete from core_entity where clientName="Contract";
        update core_entity set moduleId = (Select id from core_module where name='contracts'), name='Contract', clientName='Contract' where clientName='Module1';
        Drop table `studio_contracts_contract_custom_fields`;
        Create table studio_contracts_contract_custom_fields like cf_builder_modules_1;
        Insert into studio_contracts_contract_custom_fields select * from cf_builder_modules_1;
        ALTER TABLE `studio_contracts_contract_custom_fields` CHANGE `model_id` `id` INT(11) NOT NULL;
        Insert into studio_contracts_contract select id, id as name, user_id, from_unixtime(ctime), muser_id, from_unixtime(mtime) from builder_modules_1;


        insert ignore into core_link 
        select NULL, (select id from core_entity where clientName='Contract'),id, model_type_id, model_id, description, from_unixtime(ctime), NULL, NULL, folder_id from go_links_builder_modules_1 where model_type_id in (select id from core_entity);
        
        insert ignore into core_link 
        select NULL, model_type_id, model_id, (select id from core_entity where clientName='Contract'),id, description, from_unixtime(ctime), NULL, NULL, folder_id from go_links_builder_modules_1 where model_type_id in (select id from core_entity);
        
        #comments are todo. Check script for adviceline below
3. Create updates.php::

        <?php
        
        $updates = [];
        
        $updates['202007161055'][] = function() {
            $m = new \go\core\install\MigrateCustomFields63to64();
            $m->migrateEntity("Contract");
        };
        
        
4. Run /install/upgrade.php  


5. Clean up old module builder modules




Step 2 for Protect advice
```
UPDATE `core_module` SET `name` = 'advicelinebak' WHERE `core_module`.`id` = 2;
```
Create studio module
```
delete from core_entity where clientName="Advicelinecase";
update core_entity set moduleId = (Select id from core_module where name='adviceline'), name='Advicelinecase', clientName='Advicelinecase' where clientName='Cases';
Drop table `protectadvice_adviceline_advicelinecase_custom_fields`;
Create table protectadvice_adviceline_advicelinecase_custom_fields like cf_adviceline_cases;
Insert into protectadvice_adviceline_advicelinecase_custom_fields select * from cf_adviceline_cases;
ALTER TABLE `protectadvice_adviceline_advicelinecase_custom_fields` CHANGE `model_id` `id` INT(11) NOT NULL;
Insert into protectadvice_adviceline_advicelinecase select id, id as name, user_id, from_unixtime(ctime), muser_id, from_unixtime(mtime) from adviceline_cases;
insert ignore into core_link select NULL, (select id from core_entity where clientName='Advicelinecase'),id, model_type_id, model_id, description, from_unixtime(ctime), NULL, NULL, folder_id from go_links_adviceline_cases where model_type_id in (select id from core_entity);
insert ignore into core_link select NULL, model_type_id, model_id, (select id from core_entity where clientName='Advicelinecase'),id, description, from_unixtime(ctime), NULL, NULL, folder_id from go_links_adviceline_cases where model_type_id in (select id from core_entity);
insert into comments_comment 
    select 
        null,
        from_unixtime(ctime),
        case_id,
        (select id from core_entity where name='Advicelinecase'),
        user_id,
        muser_id,
        from_unixtime(mtime),
        REPLACE(notes, "\r\n", "<br>"),
        null
    from adviceline_messages;
```    
    
    
##TODO

### Studio
1. Refactor code to use standard entity validation. Module generation should be performed after saving the entity and initiated from the model. I suggest a public property $generate will generate the code.
2. Set icon from material set for module and entity
3. Set icon color for entity
4. When calling action frontend, regenerate most of backend stuff