DROP TABLE IF EXISTS `pr2_default_resources`;
CREATE TABLE `pr2_default_resources` (
  `template_id` int(11) NOT NULL DEFAULT 0,
  `user_id` int(11) NOT NULL,
  `budgeted_units` double NOT NULL DEFAULT 0,
  `external_fee` double NOT NULL DEFAULT 0,
  `internal_fee` double NOT NULL DEFAULT 0,
  `apply_internal_overtime` tinyint(1) NOT NULL DEFAULT 0,
  `apply_external_overtime` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `pr2_employees`;
CREATE TABLE `pr2_employees` (
  `user_id` int(11) NOT NULL,
  `closed_entries_time` int(11) DEFAULT NULL,
  `ctime` int(11) DEFAULT NULL,
  `mtime` int(11) DEFAULT NULL,
  `external_fee` double NOT NULL DEFAULT 0,
  `internal_fee` double NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `pr2_employee_activity_rate`;
CREATE TABLE `pr2_employee_activity_rate` (
  `activity_id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `external_rate` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `pr2_expenses`;
CREATE TABLE `pr2_expenses` (
  `id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `nett` double NOT NULL DEFAULT 0,
  `vat` double NOT NULL DEFAULT 0,
  `date` int(11) NOT NULL DEFAULT 0,
  `invoice_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `mtime` int(11) NOT NULL,
  `expense_budget_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `pr2_expense_budgets`;
CREATE TABLE `pr2_expense_budgets` (
  `id` int(11) NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `nett` double NOT NULL DEFAULT 0,
  `vat` double NOT NULL DEFAULT 0,
  `ctime` int(11) NOT NULL,
  `mtime` int(11) NOT NULL,
  `supplier_company_id` int(11) DEFAULT NULL,
  `budget_category_id` int(11) DEFAULT NULL,
  `project_id` int(11) NOT NULL,
  `comments` varchar(1024) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `id_number` varchar(16) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `quantity` float NOT NULL DEFAULT 1,
  `unit_type` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `contact_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `pr2_hours`;
CREATE TABLE `pr2_hours` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `duration` int(11) NOT NULL DEFAULT 0,
  `type` int(11) NOT NULL DEFAULT 0,
  `date` int(11) NOT NULL DEFAULT 0,
  `units` double NOT NULL DEFAULT 0,
  `comments` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `external_fee` double NOT NULL DEFAULT 0,
  `internal_fee` double NOT NULL DEFAULT 0,
  `status` int(11) NOT NULL DEFAULT 0,
  `income_id` int(11) DEFAULT NULL,
  `ctime` int(11) NOT NULL DEFAULT 0,
  `mtime` int(11) NOT NULL DEFAULT 0,
  `project_id` int(11) DEFAULT NULL,
  `standard_task_id` int(11) DEFAULT NULL,
  `task_id` int(11) NOT NULL DEFAULT 0,
  `travel_distance` float NOT NULL DEFAULT 0,
  `travel_costs` double NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `pr2_hours_custom_fields`;
CREATE TABLE `pr2_hours_custom_fields` (
  `id` int(11) NOT NULL,
  `test` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `test2` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `pr2_income`;
CREATE TABLE `pr2_income` (
  `id` int(11) NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `amount` double NOT NULL,
  `is_invoiced` tinyint(1) NOT NULL DEFAULT 0,
  `invoiceable` tinyint(1) NOT NULL DEFAULT 0,
  `period_start` int(11) NOT NULL DEFAULT 0,
  `period_end` int(11) NOT NULL DEFAULT 0,
  `paid_at` int(11) NOT NULL DEFAULT 0,
  `invoice_at` int(11) NOT NULL,
  `invoice_number` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `type` tinyint(1) NOT NULL,
  `project_id` int(11) NOT NULL,
  `reference_no` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `comments` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `files_folder_id` int(11) NOT NULL DEFAULT 0,
  `is_contract` tinyint(1) NOT NULL DEFAULT 0,
  `contract_repeat_amount` int(11) NOT NULL DEFAULT 1,
  `contract_repeat_freq` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `contract_end` int(11) NOT NULL DEFAULT 0,
  `contract_end_notification_days` int(11) NOT NULL DEFAULT 10,
  `contract_end_notification_active` tinyint(1) NOT NULL DEFAULT 0,
  `contract_end_notification_template` int(11) DEFAULT NULL,
  `contract_end_notification_sent` int(11) DEFAULT NULL,
  `contact` varchar(190) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `pr2_income_items`;
CREATE TABLE `pr2_income_items` (
  `id` int(11) NOT NULL,
  `income_id` int(11) NOT NULL,
  `amount` double NOT NULL DEFAULT 0,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `pr2_portlet_statuses`;
CREATE TABLE `pr2_portlet_statuses` (
  `user_id` int(11) NOT NULL,
  `status_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `pr2_projects`;
CREATE TABLE `pr2_projects` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL DEFAULT 0,
  `acl_id` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `customer` varchar(201) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `description` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `company_id` int(11) DEFAULT NULL,
  `ctime` int(11) NOT NULL DEFAULT 0,
  `mtime` int(11) NOT NULL DEFAULT 0,
  `threshold_mails` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `muser_id` int(11) NOT NULL DEFAULT 0,
  `start_time` int(11) NOT NULL DEFAULT 0,
  `due_time` int(11) NOT NULL DEFAULT 0,
  `contact_id` int(11) DEFAULT NULL,
  `contact` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `files_folder_id` int(11) NOT NULL DEFAULT 0,
  `responsible_user_id` int(11) NOT NULL DEFAULT 0,
  `calendar_id` int(11) NOT NULL DEFAULT 0,
  `event_id` int(11) NOT NULL DEFAULT 0,
  `path` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `income_type` smallint(2) NOT NULL DEFAULT 1,
  `status_id` int(11) DEFAULT NULL,
  `type_id` int(11) NOT NULL,
  `template_id` int(11) NOT NULL,
  `parent_project_id` int(11) NOT NULL DEFAULT 0,
  `default_distance` double DEFAULT NULL,
  `travel_costs` double NOT NULL DEFAULT 0,
  `reference_no` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `pr2_projects_custom_fields`;
CREATE TABLE `pr2_projects_custom_fields` (
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `pr2_resources`;
CREATE TABLE `pr2_resources` (
  `project_id` int(11) NOT NULL DEFAULT 0,
  `user_id` int(11) NOT NULL,
  `budgeted_units` double NOT NULL DEFAULT 0,
  `external_fee` double NOT NULL DEFAULT 0,
  `internal_fee` double NOT NULL DEFAULT 0,
  `apply_internal_overtime` tinyint(1) NOT NULL DEFAULT 0,
  `apply_external_overtime` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `pr2_resource_activity_rate`;
CREATE TABLE `pr2_resource_activity_rate` (
  `activity_id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `external_rate` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `pr2_standard_tasks`;
CREATE TABLE `pr2_standard_tasks` (
  `id` int(11) NOT NULL,
  `code` varchar(11) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `units` double NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `disabled` tinyint(1) NOT NULL DEFAULT 0,
  `is_billable` tinyint(1) NOT NULL DEFAULT 1,
  `is_always_billable` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `pr2_statuses`;
CREATE TABLE `pr2_statuses` (
  `id` int(11) NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `complete` tinyint(1) NOT NULL DEFAULT 0,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `filterable` tinyint(1) NOT NULL DEFAULT 1,
  `show_in_tree` tinyint(1) NOT NULL DEFAULT 1,
  `make_invoiceable` tinyint(1) NOT NULL DEFAULT 0,
  `not_for_postcalculation` tinyint(1) NOT NULL DEFAULT 0,
  `acl_id` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `pr2_tasks`;
CREATE TABLE `pr2_tasks` (
  `id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `percentage_complete` tinyint(4) NOT NULL DEFAULT 0,
  `duration` double NOT NULL DEFAULT 60,
  `due_date` int(11) DEFAULT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sort_order` int(11) DEFAULT NULL,
  `parent_id` int(11) NOT NULL DEFAULT 0,
  `has_children` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `pr2_templates`;
CREATE TABLE `pr2_templates` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL DEFAULT 0,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `acl_id` int(11) NOT NULL DEFAULT 0,
  `files_folder_id` int(11) NOT NULL DEFAULT 0,
  `fields` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `icon` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `project_type` tinyint(4) NOT NULL DEFAULT 0,
  `default_income_email_template` int(11) DEFAULT NULL,
  `default_status_id` int(11) NOT NULL,
  `default_type_id` int(11) DEFAULT NULL,
  `use_name_template` tinyint(1) NOT NULL DEFAULT 0,
  `name_template` varchar(80) COLLATE utf8mb4_unicode_ci NOT NULL,
  `show_in_tree` BOOLEAN NOT NULL DEFAULT FALSE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `pr2_templates_events`;
CREATE TABLE `pr2_templates_events` (
  `id` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `time_offset` int(11) DEFAULT NULL,
  `duration` int(11) DEFAULT NULL,
  `type` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `reminder` int(11) NOT NULL DEFAULT 0,
  `user_id` int(11) NOT NULL,
  `new_template_id` int(11) NOT NULL DEFAULT 0,
  `template_id` int(11) NOT NULL,
  `for_manager` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `pr2_timers`;
CREATE TABLE `pr2_timers` (
  `project_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `starttime` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `pr2_types`;
CREATE TABLE `pr2_types` (
  `id` int(11) NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `acl_id` int(11) NOT NULL DEFAULT 0,
  `acl_book` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


ALTER TABLE `pr2_default_resources`
  ADD PRIMARY KEY (`template_id`,`user_id`),
  ADD KEY `fk_pm_user_fees_pm_templates1_idx` (`template_id`);

ALTER TABLE `pr2_employees`
  ADD PRIMARY KEY (`user_id`);

ALTER TABLE `pr2_employee_activity_rate`
  ADD PRIMARY KEY (`activity_id`,`employee_id`),
  ADD KEY `fk_pr2_employee_activity_idx` (`employee_id`);

ALTER TABLE `pr2_expenses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `invoice_id` (`invoice_id`),
  ADD KEY `fk_pr2_expenses_pr2_expense_budgets1_idx` (`expense_budget_id`),
  ADD KEY `fk_pr2_expenses_pr2_projects1_idx` (`project_id`);

ALTER TABLE `pr2_expense_budgets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `contact_id` (`contact_id`);

ALTER TABLE `pr2_hours`
  ADD PRIMARY KEY (`id`),
  ADD KEY `status` (`status`),
  ADD KEY `income_id` (`income_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `fk_pr2_hours_pr2_projects1_idx` (`project_id`),
  ADD KEY `fk_pr2_hours_pr2_standard_tasks1_idx` (`standard_task_id`);

ALTER TABLE `pr2_hours_custom_fields`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `pr2_income`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `pr2_income_items`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `pr2_portlet_statuses`
  ADD PRIMARY KEY (`user_id`,`status_id`);

ALTER TABLE `pr2_projects`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `responsible_user_id` (`responsible_user_id`),
  ADD KEY `fk_pr2_projects_pr2_statuses1_idx` (`status_id`),
  ADD KEY `fk_pr2_projects_pr2_types1_idx` (`type_id`),
  ADD KEY `fk_pr2_projects_pr2_templates1_idx` (`template_id`),
  ADD KEY `contact_id` (`contact_id`),
  ADD KEY `company_id` (`company_id`);

ALTER TABLE `pr2_projects_custom_fields`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `pr2_resources`
  ADD PRIMARY KEY (`project_id`,`user_id`),
  ADD KEY `fk_pm_user_fees_pm_projects1_idx` (`project_id`);

ALTER TABLE `pr2_resource_activity_rate`
  ADD PRIMARY KEY (`activity_id`,`employee_id`,`project_id`),
  ADD KEY `fk_pr2_resource_activity_idx` (`project_id`,`employee_id`);

ALTER TABLE `pr2_standard_tasks`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `pr2_statuses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sort_order` (`sort_order`);

ALTER TABLE `pr2_tasks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `project_id` (`project_id`);

ALTER TABLE `pr2_templates`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_pr2_templates_pr2_types1_idx` (`default_type_id`),
  ADD KEY `fk_pr2_templates_pr2_statuses1_idx` (`default_status_id`);

ALTER TABLE `pr2_templates_events`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_pr2_templates_events_pr2_templates1_idx` (`template_id`);

ALTER TABLE `pr2_timers`
  ADD PRIMARY KEY (`project_id`,`user_id`),
  ADD KEY `project_id` (`user_id`,`starttime`);

ALTER TABLE `pr2_types`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `pr2_expenses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `pr2_expense_budgets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `pr2_hours`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `pr2_income`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `pr2_income_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `pr2_projects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `pr2_standard_tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `pr2_statuses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `pr2_tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `pr2_templates`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `pr2_templates_events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `pr2_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;


ALTER TABLE `pr2_employee_activity_rate`
  ADD CONSTRAINT `fk_pr2_employee_activity` FOREIGN KEY (`employee_id`) REFERENCES `pr2_employees` (`user_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

ALTER TABLE `pr2_expense_budgets`
  ADD CONSTRAINT `pr2_expense_budgets_ibfk_1` FOREIGN KEY (`contact_id`) REFERENCES `addressbook_contact` (`id`) ON DELETE SET NULL;

ALTER TABLE `pr2_hours_custom_fields`
  ADD CONSTRAINT `pr2_hours_custom_fields_ibfk_1` FOREIGN KEY (`id`) REFERENCES `pr2_hours` (`id`) ON DELETE CASCADE;

ALTER TABLE `pr2_projects`
  ADD CONSTRAINT `pr2_projects_ibfk_1` FOREIGN KEY (`contact_id`) REFERENCES `addressbook_contact` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `pr2_projects_ibfk_2` FOREIGN KEY (`company_id`) REFERENCES `addressbook_contact` (`id`) ON DELETE SET NULL;

ALTER TABLE `pr2_projects_custom_fields`
  ADD CONSTRAINT `pr2_projects_custom_fields_ibfk_1` FOREIGN KEY (`id`) REFERENCES `pr2_projects` (`id`) ON DELETE CASCADE;

ALTER TABLE `pr2_resource_activity_rate`
  ADD CONSTRAINT `fk_pr2_resource_activity` FOREIGN KEY (`project_id`,`employee_id`) REFERENCES `pr2_resources` (`project_id`, `user_id`) ON DELETE CASCADE ON UPDATE NO ACTION;
