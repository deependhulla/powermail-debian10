<?php
$updates["201108131015"][]="CREATE TABLE IF NOT EXISTS `bs_doc_templates` (
  `id` int(11) NOT NULL DEFAULT '0',
  `book_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL DEFAULT '0',
  `name` varchar(100) DEFAULT NULL,
  `content` longblob NOT NULL,
  `extension` varchar(4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;";

$updates["201108131015"][]="ALTER TABLE `bs_status_languages` ADD `doc_template_id` INT NOT NULL;";

$updates["201108131015"][]="ALTER TABLE `bs_order_statuses` ADD `required_status_id` INT NOT NULL;";

$updates["201108131015"][]="ALTER TABLE `bs_order_statuses` ADD `acl_id` INT NOT NULL;";

$updates["201108131015"][]='script:7_add_status_acl.inc.php';

$updates["201108131015"][]="ALTER TABLE `bs_items` ADD `order_at_supplier` BOOL NOT NULL;";

$updates["201108131015"][]="ALTER TABLE `bs_items` ADD `order_at_supplier_company_id` int(11) NOT NULL default '0';";

$updates["201108131015"][]="ALTER TABLE `bs_products` ADD `stock_min` INT NOT NULL default '0';";

$updates["201108131015"][]="ALTER TABLE `bs_order_statuses` ADD `reversal` BOOL NOT NULL default '0';";

$updates["201108131015"][]="ALTER TABLE `bs_items` ADD `amount_delivered` double NOT NULL default '0';";

$updates["201108131015"][]="ALTER TABLE `bs_books` ADD `is_purchase_orders_book` BOOL NOT NULL default '0';";

$updates["201108131015"][]="ALTER TABLE `bs_order_statuses` DROP `reversal`";

$updates["201108131015"][]="ALTER TABLE `bs_books` ADD `backorder_status_id` INT NOT NULL default '0';";
$updates["201108131015"][]="ALTER TABLE `bs_books` ADD `delivered_status_id` INT NOT NULL default '0';";
$updates["201108131015"][]="ALTER TABLE `bs_books` ADD `reversal_status_id` INT NOT NULL default '0';";

$updates["201108131015"][]="ALTER TABLE `bs_orders` ADD `project_id` INT NOT NULL AFTER `id` , ADD INDEX ( `project_id` )";

$updates["201108131015"][]="ALTER TABLE `bs_products` ADD `article_id` varchar(255) default NULL, ADD INDEX ( `article_id` )";

$updates["201108131015"][]="ALTER TABLE `bs_orders` ADD `for_warehouse` BOOL NOT NULL default '0';";

$updates["201108131015"][]="ALTER TABLE `bs_items` ADD `note` TEXT;";

$updates["201108131015"][]="ALTER TABLE `bs_products` ADD `unit` varchar(255) default NULL";
$updates["201108131015"][]="ALTER TABLE `bs_products` ADD `unit_stock` varchar(255) default NULL";

$updates["201108131015"][]="ALTER TABLE `bs_orders` ADD `dtime` INT NOT NULL  default '0'";

$updates["201108131015"][]="ALTER TABLE `bs_templates` ADD `use_html_table` BOOL NOT NULL default '0';";

$updates["201108131015"][]="ALTER TABLE `bs_templates` ADD `html_table` TEXT CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL ";

$updates["201108131015"][]="ALTER TABLE `bs_items` ADD `unit` varchar(255) default NULL";


$updates["201108131015"][]="ALTER TABLE `bs_books` ADD `addressbook_id` INT NOT NULL";

$updates["201108301040"][]="CREATE TABLE IF NOT EXISTS `bs_order_item_groups` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`order_id` int(11) NOT NULL,
	`name` varchar(100) NOT NULL DEFAULT 'Item Group',
	PRIMARY KEY (`id`),
	KEY `order_id` (`order_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;";

$updates["201108301040"][]="ALTER TABLE `bs_items` ADD `item_group_id` int(11) NOT NULL default '0';";

$updates["201108190000"][]="RENAME TABLE `go_links_7` TO `go_links_bs_orders`;";
$updates["201108190000"][]="ALTER TABLE `go_links_bs_orders` CHANGE `link_id` `model_id` INT( 11 ) NOT NULL";
$updates["201108190000"][]="ALTER TABLE `go_links_bs_orders` CHANGE `link_type` `model_type_id` INT( 11 ) NOT NULL";

$updates["201108190000"][]="RENAME TABLE `cf_7` TO `cf_bs_orders` ";
$updates["201108190000"][]="ALTER TABLE `cf_bs_orders` CHANGE `link_id` `model_id` INT( 11 ) NOT NULL DEFAULT '0'";

$updates["201109021233"][]="ALTER TABLE `bs_order_item_groups` ADD `summarize` BOOL NOT NULL;";

$updates["201108301656"][]="INSERT INTO `go_model_types` (
`id` ,
`model_name`
)
VALUES (
'7', 'GO_Billing_Model_Order'
);";


$updates["201109120000"][]="ALTER TABLE `bs_items` CHANGE `id` `id` INT( 11 ) NOT NULL AUTO_INCREMENT ";
$updates["201109120000"][]="ALTER TABLE `bs_order_status_history` CHANGE `id` `id` INT( 11 ) NOT NULL AUTO_INCREMENT ";

$updates["201109120000"][]="ALTER TABLE `bs_orders` CHANGE `id` `id` INT( 11 ) NOT NULL AUTO_INCREMENT";
$updates["201109120000"][]="ALTER TABLE `bs_orders` CHANGE `project_id` `project_id` INT( 11 ) NOT NULL DEFAULT '0'";
$updates["201109120000"][]="ALTER TABLE `bs_orders` CHANGE `payment_method` `payment_method` VARCHAR( 50 ) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT ''";
$updates["201109120000"][]="ALTER TABLE `bs_orders` CHANGE `files_folder_id` `files_folder_id` INT( 11 ) NOT NULL DEFAULT '0'";	

$updates["201110120000"][]="ALTER TABLE `bs_order_status_history` CHANGE `notified` `notified` BOOLEAN NOT NULL DEFAULT '0'";

$updates["201110141221"][]="UPDATE bs_order_status_history SET notified=0 where notified=1";
$updates["201110141221"][]="UPDATE bs_order_status_history SET notified=1 where notified=2";

$updates["201110141221"][]="ALTER TABLE `bs_orders` CHANGE `order_id` `order_id` VARCHAR( 20 ) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT ''";

$updates["201110141221"][]="ALTER TABLE `bs_orders` CHANGE `pagebreak` `pagebreak` BOOLEAN NOT NULL DEFAULT '0'";
$updates["201110141221"][]="UPDATE bs_orders SET pagebreak=0 where pagebreak=1";
$updates["201110141221"][]="UPDATE bs_orders SET pagebreak=1 where pagebreak=2";

$updates["201110141221"][]="ALTER TABLE `bs_items` CHANGE `order_at_supplier` `order_at_supplier` TINYINT( 1 ) NOT NULL DEFAULT '0'";
$updates["201110141221"][]="ALTER TABLE `bs_items` CHANGE `note` `note` TEXT CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT ''";
$updates["201110141221"][]="ALTER TABLE `bs_items` CHANGE `unit` `unit` VARCHAR( 50 ) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT ''";
$updates["201110211709"][]="ALTER TABLE `bs_orders` CHANGE `po_id` `po_id` VARCHAR( 50 ) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT ''";
$updates["201110211709"][]="ALTER TABLE `bs_orders` CHANGE `ptime` `ptime` INT( 11 ) NOT NULL DEFAULT '0'";$updates["201110211709"][]="ALTER TABLE `bs_orders` CHANGE `frontpage_text` `frontpage_text` TEXT CHARACTER SET utf8 COLLATE utf8_general_ci NULL";
$updates["201110211709"][]="ALTER TABLE `bs_orders` CHANGE `customer_extra` `customer_extra` VARCHAR( 255 ) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT ''";
$updates["201110211709"][]="ALTER TABLE `bs_orders` CHANGE `recur_type` `recur_type` VARCHAR( 10 ) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT ''";
$updates["201110211709"][]="ALTER TABLE `bs_orders` CHANGE `reference` `reference` VARCHAR( 100 ) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT ''";

$updates["201110251036"][]="ALTER TABLE `bs_orders` CHANGE `for_warehouse` `for_warehouse` TINYINT( 1 ) NOT NULL DEFAULT '0'";
$updates["201110251036"][]="ALTER TABLE `bs_books` ADD `files_folder_id` INT NOT NULL DEFAULT '0'";

$updates["201110251036"][]="ALTER TABLE `bs_order_item_groups` CHANGE `summarize` `summarize` TINYINT( 1 ) NOT NULL DEFAULT '0'";

$updates["201111031147"][]="ALTER TABLE `bs_order_statuses` CHANGE `remove_from_stock` `remove_from_stock` BOOLEAN NOT NULL DEFAULT '0'";
$updates["201111031147"][]="UPDATE bs_order_statuses SET remove_from_stock=0 where remove_from_stock=1";
$updates["201111031147"][]="UPDATE bs_order_statuses SET remove_from_stock=1 where remove_from_stock=2";


$updates["201111031147"][]="ALTER TABLE `bs_order_statuses` CHANGE `payment_required` `payment_required` BOOLEAN NOT NULL DEFAULT '0'";
$updates["201111031147"][]="UPDATE bs_order_statuses SET payment_required=0 where payment_required=1";
$updates["201111031147"][]="UPDATE bs_order_statuses SET payment_required=1 where payment_required=2";

$updates["201111031147"][]="ALTER TABLE `bs_order_statuses` CHANGE `read_only` `read_only` BOOLEAN NOT NULL DEFAULT '0'";
$updates["201111031147"][]="UPDATE bs_order_statuses SET read_only=0 where read_only=1";
$updates["201111031147"][]="UPDATE bs_order_statuses SET read_only=1 where read_only=2";

$updates["201111031147"][]="ALTER TABLE `bs_status_languages` CHANGE `pdf_template_id` `pdf_template_id` INT( 11 ) NOT NULL DEFAULT '0'";
$updates["201111031147"][]="ALTER TABLE `bs_status_languages` CHANGE `doc_template_id` `doc_template_id` INT( 11 ) NOT NULL DEFAULT '0'";

$updates["201111171331"][]="ALTER TABLE `bs_order_statuses` ADD `color` varchar(6) NOT NULL DEFAULT 'ffffff';";


$updates["201111221619"][]="ALTER TABLE `bs_templates` CHANGE `show_supplier_product_id` `show_supplier_product_id` BOOLEAN NOT NULL DEFAULT '0'";
$updates["201111221619"][]="UPDATE bs_templates SET show_supplier_product_id=0 where show_supplier_product_id=1";
$updates["201111221619"][]="UPDATE bs_templates SET show_supplier_product_id=1 where show_supplier_product_id=2";

$updates["201111221619"][]="ALTER TABLE `bs_templates` CHANGE `show_prod_prices` `show_prod_prices` BOOLEAN NOT NULL DEFAULT '1'";
$updates["201111221619"][]="UPDATE bs_templates SET show_prod_prices=0 where show_prod_prices=1";
$updates["201111221619"][]="UPDATE bs_templates SET show_prod_prices=1 where show_prod_prices=2";

$updates["201111221619"][]="ALTER TABLE `bs_templates` CHANGE `show_unit_prices` `show_unit_prices` BOOLEAN NOT NULL DEFAULT '1'";
$updates["201111221619"][]="UPDATE bs_templates SET show_unit_prices=0 where show_unit_prices=1";
$updates["201111221619"][]="UPDATE bs_templates SET show_unit_prices=1 where show_unit_prices=2";

$updates["201111221619"][]="ALTER TABLE `bs_templates` CHANGE `show_total_prices` `show_total_prices` BOOLEAN NOT NULL DEFAULT '1'";
$updates["201111221619"][]="UPDATE bs_templates SET show_total_prices=0 where show_total_prices=1";
$updates["201111221619"][]="UPDATE bs_templates SET show_total_prices=1 where show_total_prices=2";

$updates["201111221619"][]="ALTER TABLE `bs_templates` CHANGE `show_vat` `show_vat` BOOLEAN NOT NULL DEFAULT '1'";
$updates["201111221619"][]="UPDATE bs_templates SET show_vat=0 where show_vat=1";
$updates["201111221619"][]="UPDATE bs_templates SET show_vat=1 where show_vat=2";

$updates["201111221619"][]="ALTER TABLE `bs_templates` CHANGE `show_amounts` `show_amounts` BOOLEAN NOT NULL DEFAULT '1'";
$updates["201111221619"][]="UPDATE bs_templates SET show_amounts=0 where show_amounts=1";
$updates["201111221619"][]="UPDATE bs_templates SET show_amounts=1 where show_amounts=2";

$updates["201111221619"][]="ALTER TABLE `bs_templates` CHANGE `logo_only_first_page` `logo_only_first_page` BOOLEAN NOT NULL DEFAULT '0'";
$updates["201111221619"][]="UPDATE bs_templates SET logo_only_first_page=0 where logo_only_first_page=1";
$updates["201111221619"][]="UPDATE bs_templates SET logo_only_first_page=1 where logo_only_first_page=2";

$updates["201111221619"][]="ALTER TABLE `bs_books` CHANGE `default_vat` `default_vat` DOUBLE NOT NULL DEFAULT '19'";
$updates["201111221619"][]="ALTER TABLE `bs_books` CHANGE `addressbook_id` `addressbook_id` INT( 11 ) NOT NULL DEFAULT '0'";
$updates["201111221619"][]="ALTER TABLE `bs_books` CHANGE `call_after_days` `call_after_days` TINYINT( 4 ) NOT NULL DEFAULT '0'";
$updates["201111221619"][]="ALTER TABLE `bs_books` CHANGE `id` `id` INT( 11 ) NOT NULL AUTO_INCREMENT ";

$updates["201111221619"][]="ALTER TABLE `bs_templates` CHANGE `margin_top` `margin_top` INT( 11 ) NOT NULL DEFAULT '30'";
$updates["201111221619"][]="ALTER TABLE `bs_templates` CHANGE `margin_bottom` `margin_bottom` INT( 11 ) NOT NULL DEFAULT '30'";
$updates["201111221619"][]="ALTER TABLE `bs_templates` CHANGE `margin_right` `margin_right` INT( 11 ) NOT NULL DEFAULT '30'";
$updates["201111221619"][]="ALTER TABLE `bs_templates` CHANGE `margin_left` `margin_left` INT( 11 ) NOT NULL DEFAULT '30'";


$updates["201111221619"][]="ALTER TABLE `bs_templates` CHANGE `page_format` `page_format` INT( 11 ) NOT NULL DEFAULT 'A4'";

$updates["201111221619"][]="ALTER TABLE `bs_templates` CHANGE `logo` `logo` INT( 11 ) NOT NULL DEFAULT ''";
$updates["201111221619"][]="ALTER TABLE `bs_templates` CHANGE `logo_width` `logo_width` INT( 11 ) NOT NULL DEFAULT '0'";
$updates["201111221619"][]="ALTER TABLE `bs_templates` CHANGE `logo_height` `logo_height` INT( 11 ) NOT NULL DEFAULT '0'";

$updates["201111221619"][]="ALTER TABLE `bs_templates` CHANGE `right_col_top` `right_col_top` INT( 11 ) NOT NULL DEFAULT '30'";
$updates["201111221619"][]="ALTER TABLE `bs_templates` CHANGE `right_col_left` `right_col_left` INT( 11 ) NOT NULL DEFAULT '365'";
$updates["201111221619"][]="ALTER TABLE `bs_templates` CHANGE `left_col_top` `left_col_top` INT( 11 ) NOT NULL DEFAULT '30'";
$updates["201111221619"][]="ALTER TABLE `bs_templates` CHANGE `left_col_left` `left_col_left` INT( 11 ) NOT NULL DEFAULT '30'";
$updates["201111221619"][]="ALTER TABLE `bs_templates` CHANGE `logo_top` `logo_top` INT( 11 ) NOT NULL DEFAULT '0'";
$updates["201111221619"][]="ALTER TABLE `bs_templates` CHANGE `logo_left` `logo_left` INT( 11 ) NOT NULL DEFAULT '0'";
$updates["201111221619"][]="ALTER TABLE `bs_templates` CHANGE `id` `id` INT( 11 ) NOT NULL AUTO_INCREMENT ";
$updates["201111221619"][]="ALTER TABLE `bs_books` CHANGE `addressbook_id` `addressbook_id` INT( 11 ) NOT NULL DEFAULT '0'";
$updates["201111221619"][]="ALTER TABLE `bs_templates` CHANGE `html_table` `html_table` TEXT CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ";

$updates["201111221619"][]="ALTER TABLE `bs_order_statuses` CHANGE `required_status_id` `required_status_id` INT( 11 ) NOT NULL DEFAULT '0'";

$updates["201112221547"][]="CREATE TABLE IF NOT EXISTS `cf_bs_orders` (
  `model_id` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`model_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;";

$updates["201201051136"][]="ALTER TABLE `bs_order_statuses` CHANGE `id` `id` INT( 11 ) NOT NULL AUTO_INCREMENT ";

$updates["201201051136"][]="ALTER TABLE `bs_items` CHANGE `note` `note` TEXT CHARACTER SET utf8 COLLATE utf8_general_ci NULL ";

$updates["201201051136"][]="ALTER TABLE `bs_orders` CHANGE `customer_address` `customer_address` VARCHAR( 100 ) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL";

$updates["201201051136"][]="ALTER TABLE `bs_orders` CHANGE `customer_name` `customer_name` VARCHAR( 100 ) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT ''";

$updates["201202131200"][]="ALTER TABLE `bs_status_languages` CHANGE `email_template` `email_template` LONGTEXT CHARACTER SET utf8 COLLATE utf8_general_ci NULL";

$updates["201203081110"][]="ALTER TABLE `bs_category_languages` CHANGE `name` `name` varchar(50) NOT NULL DEFAULT '';";
$updates["201203081110"][]="ALTER TABLE `bs_languages` CHANGE `id` `id` int(11) NOT NULL AUTO_INCREMENT;";
$updates["201203081110"][]="ALTER TABLE `bs_languages` CHANGE `language` `language` varchar(10) NOT NULL DEFAULT '';";
$updates["201203081110"][]="ALTER TABLE `bs_languages` CHANGE `name` `name` varchar(50) NOT NULL DEFAULT '';";
$updates["201203081110"][]="ALTER TABLE `bs_product_categories` CHANGE `id` `id` int(11) NOT NULL AUTO_INCREMENT;";
$updates["201203081110"][]="ALTER TABLE `bs_product_languages` CHANGE `name` `name` varchar(100) NOT NULL DEFAULT '';";
$updates["201203081110"][]="ALTER TABLE `bs_product_languages` CHANGE `short_description` `short_description` varchar(255) NOT NULL DEFAULT '';";
$updates["201203081440"][]="ALTER TABLE `bs_products` CHANGE `id` `id` int(11) NOT NULL AUTO_INCREMENT;";
$updates["201203081440"][]="ALTER TABLE `bs_products` CHANGE `image` `image` varchar(255) NOT NULL DEFAULT '';";
$updates["201203081440"][]="ALTER TABLE `bs_products` CHANGE `required_products` `required_products` varchar(255) NOT NULL DEFAULT '';";
$updates["201203081440"][]="ALTER TABLE `bs_products` CHANGE `unit` `unit` varchar(255) NOT NULL DEFAULT '';";
$updates["201203081440"][]="ALTER TABLE `bs_products` CHANGE `unit_stock` `unit_stock` varchar(255) NOT NULL DEFAULT '';";

$updates["201202131200"][]="ALTER TABLE `bs_order_item_groups` ADD `sort_order` INT NOT NULL DEFAULT '0'";




$updates["201203231500"][]="ALTER TABLE `bs_orders` CHANGE `authcode` `authcode` VARCHAR( 50 ) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT ''";
$updates["201203231500"][]="ALTER TABLE `bs_orders` CHANGE `customer_salutation` `customer_salutation` VARCHAR( 100 ) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT ''";
$updates["201203231500"][]="ALTER TABLE `bs_orders` CHANGE `customer_contact_name` `customer_contact_name` VARCHAR( 50 ) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT ''";
$updates["201203231500"][]="ALTER TABLE `bs_orders` CHANGE `customer_address` `customer_address` VARCHAR( 100 ) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT ''";
$updates["201203231500"][]="ALTER TABLE `bs_orders` CHANGE `customer_address_no` `customer_address_no` VARCHAR( 50 ) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT ''";
$updates["201203231500"][]="ALTER TABLE `bs_orders` CHANGE `customer_zip` `customer_zip` VARCHAR( 20 ) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT ''";
$updates["201203231500"][]="ALTER TABLE `bs_orders` CHANGE `customer_city` `customer_city` VARCHAR( 50 ) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT ''";
$updates["201203231500"][]="ALTER TABLE `bs_orders` CHANGE `customer_state` `customer_state` VARCHAR( 50 ) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT ''";
$updates["201203231500"][]="ALTER TABLE `bs_orders` CHANGE `customer_vat_no` `customer_vat_no` VARCHAR( 50 ) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT ''";
$updates["201203231500"][]="ALTER TABLE `bs_orders` CHANGE `customer_email` `customer_email` VARCHAR( 100 ) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT ''";
$updates["201203231500"][]="ALTER TABLE `bs_orders` CHANGE `cost_code` `cost_code` VARCHAR( 50 ) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT ''";

$updates["201203231500"][]="ALTER TABLE `bs_items` CHANGE `cost_code` `cost_code` VARCHAR( 50 ) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT ''";

$updates["201204161400"][]="CREATE TABLE IF NOT EXISTS `cf_bs_products` (
  `model_id` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`model_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;";

$updates["201204181635"][]="ALTER TABLE `bs_orders` ADD `customer_crn` varchar(50) DEFAULT '';";

$updates["201204161500"][]="CREATE TABLE IF NOT EXISTS `bs_item_product_option` (
  `item_id` int(11) NOT NULL,
  `product_option_value_id` int(11) NOT NULL,
  PRIMARY KEY (`item_id`,`product_option_value_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;";

$updates["201204161500"][]="CREATE TABLE IF NOT EXISTS `bs_product_option` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `type` varchar(15) NOT NULL DEFAULT 'text',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;";

$updates["201204161500"][]="CREATE TABLE IF NOT EXISTS `bs_product_option_language` (
  `product_option_id` int(11) NOT NULL,
  `language_id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`product_option_id`,`language_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;";

$updates["201204161500"][]="CREATE TABLE IF NOT EXISTS `bs_product_option_value` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_option_id` int(11) NOT NULL,
  `value` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;";

$updates["201204161500"][]="CREATE TABLE IF NOT EXISTS `bs_product_option_value_language` (
  `product_option_value_id` int(11) NOT NULL,
  `language_id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`product_option_value_id`,`language_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;";


$updates["201204271111"][]="update bs_products set total_price=list_price*(1+(vat/100));";

$updates["201204271111"][]="ALTER TABLE `bs_products`
  DROP `allow_bonus_points`,
  DROP `special`,
  DROP `special_list_price`,
  DROP `special_total_price`,
  DROP `charge_shipping_costs`,
  DROP `bonus_points`;";

//$updates["201205081314"][]="UPDATE `bs_pdf_templates` SET right_col = replace( right_col, '{col_', '{order:col_' )";
//$updates["201205081314"][]="UPDATE `bs_pdf_templates` SET left_col = replace( left_col, '{col_', '{order:col_' )";
//$updates["201205081314"][]="UPDATE `bs_pdf_templates` SET closing = replace( closing, '{col_', '{order:col_' )";
//$updates["201205081314"][]="UPDATE `bs_pdf_templates` SET footer = replace( footer, '{col_', '{order:col_' )";

$updates["201205231016"][]="ALTER TABLE `bs_items` CHANGE `vat` `vat` DOUBLE NOT NULL";



$updates["201207261415"][]="ALTER TABLE `bs_templates` ADD `repeat_header` tinyint(1) NOT NULL DEFAULT '0';";

$updates["201208311200"][]="ALTER TABLE `bs_orders` CHANGE `vat` `vat` DOUBLE DEFAULT NULL";

$updates["201209101730"][]="ALTER TABLE `bs_templates` ADD `show_net_unit_price` tinyint(1) NOT NULL DEFAULT '1';";
$updates["201209101730"][]="ALTER TABLE `bs_templates` ADD `show_net_total_price` tinyint(1) NOT NULL DEFAULT '1';";

$updates["201209181230"][]="ALTER TABLE `bs_order_item_groups` ADD `show_individual_prices` tinyint(1) NOT NULL DEFAULT '1';";

$updates["201209201036"][]="ALTER TABLE `bs_templates` CHANGE `show_total_prices` `show_summary_totals` TINYINT( 1 ) NOT NULL DEFAULT '1'";
$updates["201209201036"][]="ALTER TABLE `bs_templates` CHANGE `show_unit_prices` `show_nett_unit_price` TINYINT( 1 ) NOT NULL DEFAULT '1'";
$updates["201209201036"][]="ALTER TABLE `bs_templates` CHANGE `show_net_unit_price` `show_gross_unit_price` TINYINT( 1 ) NOT NULL DEFAULT '0'";
$updates["201209201036"][]="ALTER TABLE `bs_templates` CHANGE `show_net_total_price` `show_gross_total_price` TINYINT( 1 ) NOT NULL DEFAULT '0'";
$updates["201209201036"][]="update bs_templates set show_gross_unit_price=0, show_gross_total_price=0;";
$updates["201209201036"][]="ALTER TABLE `bs_templates` CHANGE `show_prod_prices` `show_nett_total_price` TINYINT( 1 ) NOT NULL DEFAULT '1'";

$updates["201210021340"][]="ALTER TABLE `bs_product_categories` ADD `published` BOOLEAN NOT NULL DEFAULT '0'";

$updates["201211282056"][]="ALTER TABLE `bs_books` ADD `import_status_id` INT NOT NULL DEFAULT '0',
ADD `import_notify_customer` INT NOT NULL DEFAULT '0',
ADD `import_duplicate_to_book` INT NOT NULL DEFAULT '0',
ADD `import_duplicate_status_id` INT NOT NULL DEFAULT '0'";


$updates["201301281006"][]="ALTER TABLE `bs_templates` ADD `show_date_sent` BOOLEAN NOT NULL DEFAULT '0'";

$updates["201302201410"][]="ALTER TABLE `bs_templates` ADD `show_units` tinyint(1) NOT NULL DEFAULT '0';";

$updates["201302271145"][]="ALTER TABLE `bs_items` ADD `extra_cost_status_id` int(11) NOT NULL DEFAULT '0';";
$updates["201302271145"][]="ALTER TABLE `bs_status_languages` ADD `extra_cost_item_text` varchar(200) DEFAULT NULL;";
$updates["201302271145"][]="ALTER TABLE `bs_order_statuses` ADD `apply_extra_cost` tinyint(1) DEFAULT '0';";
$updates["201302271145"][]="ALTER TABLE `bs_order_statuses` ADD `extra_cost_min_value` double DEFAULT NULL;";
$updates["201302271145"][]="ALTER TABLE `bs_order_statuses` ADD `extra_cost_percentage` double DEFAULT NULL;";

$updates["201305081202"][]="ALTER TABLE `bs_products` ADD `files_folder_id` int(11) NOT NULL DEFAULT '0';";

$updates["201305151419"][]="ALTER TABLE  `bs_doc_templates` CHANGE  `id`  `id` INT( 11 ) NOT NULL AUTO_INCREMENT";
$updates['201305161419'][]="ALTER TABLE `bs_orders` ADD `muser_id` int(11) NOT NULL DEFAULT '0';";

$updates["201306171030"][] = "ALTER TABLE `bs_cost_codes` CHANGE `id` `id` INT( 11 ) NOT NULL AUTO_INCREMENT;";

$updates["201306251248"][] = "ALTER TABLE  `bs_books` ADD  `order_id_length` INT NOT NULL DEFAULT '6' AFTER  `order_id_prefix`";

$updates["201310091450"][] = "ALTER TABLE  `bs_books` ADD  `allow_delete` BOOLEAN NOT NULL DEFAULT FALSE";
$updates["201310091450"][] = "UPDATE  `bs_books` SET `allow_delete`=1;";

$updates["201311041100"][] = "ALTER TABLE `bs_templates` ADD `show_page_numbers` TINYINT( 1 ) NOT NULL DEFAULT '0';";

$updates["201311051130"][] = "ALTER TABLE `bs_products` ADD `cost_code` varchar(50) DEFAULT NULL;";
$updates["201311120915"][] = "ALTER TABLE `bs_templates` ADD `show_unit_cost` TINYINT( 1 ) NOT NULL DEFAULT '0';";

$updates["201311081130"][] = "ALTER TABLE  `bs_templates` CHANGE  `show_gross_unit_price`  `show_gross_unit_price` TINYINT( 1 ) NOT NULL DEFAULT  '0';";
$updates["201311081130"][] = "ALTER TABLE  `bs_templates` CHANGE  `show_gross_total_price`  `show_gross_total_price` TINYINT( 1 ) NOT NULL DEFAULT  '0';";

$updates["201312191345"][] = "ALTER TABLE `bs_orders` ADD `total_paid` double NOT NULL DEFAULT '0';";
$updates["201312191445"][] = "ALTER TABLE `bs_templates` ADD `show_total_paid` TINYINT( 1 ) NOT NULL DEFAULT '0';";

$updates["201401021115"][] = "UPDATE `bs_orders` SET total_paid=total WHERE ptime>0 AND total_paid=0;";
$updates['201403191645'][] = "ALTER TABLE `bs_templates` ADD `show_reference` TINYINT( 1 ) NOT NULL DEFAULT '1';";

$updates["201403100925"][] = "update go_acl set level=50 where acl_id in (select acl_id from bs_order_statuses);";

$updates['201406101400'][] = "ALTER TABLE `bs_templates` ADD `show_product_number` TINYINT( 1 ) NOT NULL DEFAULT '0',
ADD `show_cost_code` TINYINT( 1 ) NOT NULL DEFAULT '0',
ADD `show_item_id` TINYINT( 1 ) NOT NULL DEFAULT '0';";

$updates['201407111215'][] = "";

$updates["201407111215"][] = "ALTER TABLE `bs_templates` ADD COLUMN `stationery_paper` VARCHAR(255) NULL AFTER `page_format`;";

$updates["201407111215"][] = "ALTER TABLE  `bs_expense_books` CHANGE  `id`  `id` INT( 11 ) NOT NULL AUTO_INCREMENT ;";
$updates["201407111215"][] = "ALTER TABLE  `bs_expense_categories` CHANGE  `id`  `id` INT( 11 ) NOT NULL AUTO_INCREMENT ;";
$updates["201402271730"][] = "ALTER TABLE  `bs_expenses` CHANGE  `id`  `id` INT( 11 ) NOT NULL AUTO_INCREMENT ;";

$updates["201407111215"][] = "ALTER TABLE  `bs_expenses` CHANGE  `invoice_id`  `invoice_id` INT( 11 ) NOT NULL DEFAULT  '0';";

$updates['201409021500'][] = "ALTER TABLE `bs_cost_codes` ADD `name` VARCHAR( 100 ) NOT NULL ,ADD `description` TEXT NULL ;";

$updates['201410101000'][] = "ALTER TABLE `bs_items` ADD `tracking_code` VARCHAR( 255 ) NULL AFTER `cost_code` ;";

$updates['201410141100'][] = "ALTER TABLE `bs_orders` ADD `due_date` int(11) NULL ;";
$updates['201410141115'][] = "ALTER TABLE `bs_books` ADD `default_due_days` INT NOT NULL DEFAULT '14';";

$updates['201410161430'][] = "ALTER TABLE `bs_cost_codes` CHANGE `book_id` `book_id` INT( 11 ) NOT NULL DEFAULT '0';";

$updates['201410161500'][] = "CREATE TABLE IF NOT EXISTS `bs_tracking_codes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `costcode_id` int(11) NOT NULL,
  `code` varchar(255) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `description` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;";

$updates['201410241200'][] = "CREATE TABLE IF NOT EXISTS `bs_tax_rates` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `percentage` double NOT NULL,
  `description` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;";

$updates['201410241500'][] = "ALTER TABLE `bs_products` ADD `tracking_code` VARCHAR( 255 ) NULL ;";

$updates['201410241700'][] = "CREATE TABLE IF NOT EXISTS `bs_order_payments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) NOT NULL,
  `date` int(11) NOT NULL,
  `amount` double NOT NULL,
  `description` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;";

//$updates["201410271330"][]='script:8_fill_payments_table_for_existing_orders.php';
$updates['201410271330'][]='insert into bs_order_payments (order_id, `date`, amount, description) select id,ptime,total_paid, concat(\'Conversion on update at \', curdate()) from bs_orders where total_paid>0;';
$updates['201411041200'][] = "UPDATE `bs_items` SET `item_group_id`= 0 WHERE `item_group_id` NOT IN (SELECT `id` FROM `bs_order_item_groups`);";

$updates['201411051215'][] = "ALTER TABLE `bs_orders` ADD `other_shipping_address` BOOLEAN NOT NULL DEFAULT FALSE , ADD `shipping_to` VARCHAR(255) NULL , ADD `shipping_salutation` VARCHAR(100) NULL , ADD `shipping_address` VARCHAR(100) NULL , ADD `shipping_address_no` VARCHAR(50) NULL , ADD `shipping_zip` VARCHAR(20) NULL , ADD `shipping_city` VARCHAR(50) NULL , ADD `shipping_state` VARCHAR(50) NULL , ADD `shipping_country` CHAR(2) NULL , ADD `shipping_extra` VARCHAR(255) NULL ;";

$updates['201411101330'][] = "ALTER TABLE `bs_order_statuses` ADD `email_bcc` VARCHAR(100) NULL , ADD `email_owner` BOOLEAN NOT NULL DEFAULT FALSE ;";
$updates["201411101345"][] = "script:9_move_bcc_from_books_to_statuses.php";
$updates["201411101350"][] = "ALTER TABLE `bs_books` DROP `bcc`;";

$updates["201411130915"][] = "ALTER TABLE `bs_orders` ADD `telesales_agent` INT NULL , ADD `fieldsales_agent` INT NULL ;";
$updates["201411131030"][] = "ALTER TABLE `bs_books` ADD `show_sales_agents` BOOLEAN NOT NULL DEFAULT FALSE ;";

$updates['201501051230'][] = "ALTER TABLE `bs_expense_books` CHANGE `id` `id` INT( 11 ) NOT NULL AUTO_INCREMENT ;";
$updates['201501051230'][] = "ALTER TABLE `bs_expense_categories` CHANGE `id` `id` INT( 11 ) NOT NULL AUTO_INCREMENT ;";
$updates['201501051230'][] = "ALTER TABLE `bs_expenses` CHANGE `id` `id` INT( 11 ) NOT NULL AUTO_INCREMENT ;";

$updates['201504131423'][] = "UPDATE `bs_books` SET order_id_prefix = REPLACE (order_id_prefix, '%y', '%Y');";

$updates['201504141515'][] = "ALTER TABLE `bs_items` ADD `vat_code` VARCHAR(255) NULL DEFAULT NULL AFTER `vat`;";
$updates['201504141645'][] = "ALTER TABLE `bs_tax_rates` ADD `book_id` INT NOT NULL DEFAULT '0' AFTER `id`;";

$updates['201510141645'][] = "ALTER TABLE `bs_books` ADD COLUMN `auto_paid_status` BOOLEAN NOT NULL DEFAULT 0;";

$updates["201604131015"][] = '';


$updates['201610281650'][] = 'SET foreign_key_checks = 0;';

$updates['201610281659'][] = 'ALTER TABLE `bs_products` CHANGE `article_id` `article_id` VARCHAR(190);';

$updates['201610281650'][] = 'ALTER TABLE `bs_batchjob_orders` ENGINE=InnoDB;';
$updates['201610281650'][] = 'ALTER TABLE `bs_batchjob_orders` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;';
$updates['201610281650'][] = 'ALTER TABLE `bs_batchjobs` ENGINE=InnoDB;';
$updates['201610281650'][] = 'ALTER TABLE `bs_batchjobs` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;';
$updates['201610281650'][] = 'ALTER TABLE `bs_books` ENGINE=InnoDB;';
$updates['201610281650'][] = 'ALTER TABLE `bs_books` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;';
$updates['201610281650'][] = 'ALTER TABLE `bs_category_languages` ENGINE=InnoDB;';
$updates['201610281650'][] = 'ALTER TABLE `bs_category_languages` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;';
$updates['201610281650'][] = 'ALTER TABLE `bs_cost_codes` ENGINE=InnoDB;';
$updates['201610281650'][] = 'ALTER TABLE `bs_cost_codes` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;';
$updates['201610281650'][] = 'ALTER TABLE `bs_doc_templates` ENGINE=InnoDB;';
$updates['201610281650'][] = 'ALTER TABLE `bs_doc_templates` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;';
$updates['201610281650'][] = 'ALTER TABLE `bs_expense_books` ENGINE=InnoDB;';
$updates['201610281650'][] = 'ALTER TABLE `bs_expense_books` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;';
$updates['201610281650'][] = 'ALTER TABLE `bs_expense_categories` ENGINE=InnoDB;';
$updates['201610281650'][] = 'ALTER TABLE `bs_expense_categories` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;';
$updates['201610281650'][] = 'ALTER TABLE `bs_expenses` ENGINE=InnoDB;';
$updates['201610281650'][] = 'ALTER TABLE `bs_expenses` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;';
$updates['201610281650'][] = 'ALTER TABLE `bs_item_product_option` ENGINE=InnoDB;';
$updates['201610281650'][] = 'ALTER TABLE `bs_item_product_option` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;';
$updates['201610281650'][] = 'ALTER TABLE `bs_items` ENGINE=InnoDB;';
$updates['201610281650'][] = 'ALTER TABLE `bs_items` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;';
$updates['201610281650'][] = 'ALTER TABLE `bs_languages` ENGINE=InnoDB;';
$updates['201610281650'][] = 'ALTER TABLE `bs_languages` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;';
$updates['201610281650'][] = 'ALTER TABLE `bs_numbers` ENGINE=InnoDB;';
$updates['201610281650'][] = 'ALTER TABLE `bs_numbers` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;';
$updates['201610281650'][] = 'ALTER TABLE `bs_order_item_groups` ENGINE=InnoDB;';
$updates['201610281650'][] = 'ALTER TABLE `bs_order_item_groups` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;';
$updates['201610281650'][] = 'ALTER TABLE `bs_order_payments` ENGINE=InnoDB;';
$updates['201610281650'][] = 'ALTER TABLE `bs_order_payments` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;';
$updates['201610281650'][] = 'ALTER TABLE `bs_order_status_history` ENGINE=InnoDB;';
$updates['201610281650'][] = 'ALTER TABLE `bs_order_status_history` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;';
$updates['201610281650'][] = 'ALTER TABLE `bs_order_statuses` ENGINE=InnoDB;';
$updates['201610281650'][] = 'ALTER TABLE `bs_order_statuses` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;';
$updates['201610281650'][] = 'ALTER TABLE `bs_orders` ENGINE=InnoDB;';
$updates['201610281650'][] = 'ALTER TABLE `bs_orders` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;';
$updates['201610281650'][] = 'ALTER TABLE `bs_product_categories` ENGINE=InnoDB;';
$updates['201610281650'][] = 'ALTER TABLE `bs_product_categories` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;';
$updates['201610281650'][] = 'ALTER TABLE `bs_product_languages` ENGINE=InnoDB;';
$updates['201610281650'][] = 'ALTER TABLE `bs_product_languages` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;';
$updates['201610281650'][] = 'ALTER TABLE `bs_product_option` ENGINE=InnoDB;';
$updates['201610281650'][] = 'ALTER TABLE `bs_product_option` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;';
$updates['201610281650'][] = 'ALTER TABLE `bs_product_option_language` ENGINE=InnoDB;';
$updates['201610281650'][] = 'ALTER TABLE `bs_product_option_language` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;';
$updates['201610281650'][] = 'ALTER TABLE `bs_product_option_value` ENGINE=InnoDB;';
$updates['201610281650'][] = 'ALTER TABLE `bs_product_option_value` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;';
$updates['201610281650'][] = 'ALTER TABLE `bs_product_option_value_language` ENGINE=InnoDB;';
$updates['201610281650'][] = 'ALTER TABLE `bs_product_option_value_language` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;';
$updates['201610281650'][] = 'ALTER TABLE `bs_products` ENGINE=InnoDB;';
$updates['201610281650'][] = 'ALTER TABLE `bs_products` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;';
$updates['201610281650'][] = 'ALTER TABLE `bs_status_languages` ENGINE=InnoDB;';
$updates['201610281650'][] = 'ALTER TABLE `bs_status_languages` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;';
$updates['201610281650'][] = '';
$updates['201610281650'][] = '';
$updates['201610281650'][] = '';
$updates['201610281650'][] = '';
$updates['201610281650'][] = '';
$updates['201610281650'][] = '';
$updates['201610281650'][] = 'ALTER TABLE `bs_tax_rates` ENGINE=InnoDB;';
$updates['201610281650'][] = 'ALTER TABLE `bs_tax_rates` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;';
$updates['201610281650'][] = 'ALTER TABLE `bs_templates` ENGINE=InnoDB;';
$updates['201610281650'][] = 'ALTER TABLE `bs_templates` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;';
$updates['201610281650'][] = 'ALTER TABLE `bs_tracking_codes` ENGINE=InnoDB;';
$updates['201610281650'][] = 'ALTER TABLE `bs_tracking_codes` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;';

$updates['201610281650'][] = 'ALTER TABLE `cf_bs_orders` ENGINE=InnoDB;';
$updates['201610281650'][] = 'ALTER TABLE `cf_bs_orders` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;';

$updates['201610281650'][] = 'ALTER TABLE `cf_bs_products` ENGINE=InnoDB;';
$updates['201610281650'][] = 'ALTER TABLE `cf_bs_products` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;';

$updates['201610281650'][] = 'ALTER TABLE `go_links_bs_orders` ENGINE=InnoDB;';
$updates['201610281650'][] = 'ALTER TABLE `go_links_bs_orders` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;';


$updates['201610281659'][] = 'SET foreign_key_checks = 1;';

$updates['201704181659'][] = "ALTER TABLE `bs_orders` ADD `extra_costs` DOUBLE NOT NULL DEFAULT '0';";
$updates['201802271438'][] = "ALTER TABLE `bs_order_statuses` ADD COLUMN `ask_to_notify_customer` TINYINT(1) NOT NULL DEFAULT 1 AFTER `email_owner`;";
$updates['201809111423'][] = "ALTER TABLE `bs_books` CHANGE `country` `country` CHAR(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '';";

$updates['201901301055'][] = "ALTER TABLE `bs_languages` ADD INDEX `language` (`language`);";


//Address book branch
$updates['201901301055'][] = "ALTER TABLE `cf_bs_orders` CHANGE `model_id` `id` INT(11) NOT NULL DEFAULT '0';";
$updates['201901301055'][] = "RENAME TABLE `cf_bs_orders` TO `bs_orders_custom_fields`;";
$updates['201901301055'][] = "delete from bs_orders_custom_fields where id not in (select id from bs_orders);";

$updates['201901301055'][] = "ALTER TABLE `cf_bs_products` CHANGE `model_id` `id` INT(11) NOT NULL DEFAULT '0';";
$updates['201901301055'][] = "RENAME TABLE `cf_bs_products` TO `bs_products_custom_fields`;";
$updates['201901301055'][] = "delete from bs_products_custom_fields where id not in (select id from bs_products);";

$updates['201901301055'][] = "ALTER TABLE `bs_products_custom_fields` ADD FOREIGN KEY (`id`) REFERENCES `bs_products`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;";

$updates['201901301055'][] = "ALTER TABLE `bs_orders_custom_fields` ADD FOREIGN KEY (`id`) REFERENCES `bs_orders`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;";


$updates['201903291350'][] = function() {	
	$m = new \go\core\install\MigrateCustomFields63to64();
	$m->migrateEntity("Order");	
	$m->migrateEntity("Product");	
};


$updates['201901301055'][] = function() {
	$m = new go\modules\community\addressbook\install\Migrate63to64();
	$increment = $m->getCompanyIdIncrement();
	\go()->getDbConnection()->update('bs_orders', [
			'company_id' => new \go\core\db\Expression('company_id + '.$increment)
			], 
					'company_id > 0 AND company_id IS NOT NULL')
					->execute();
	
	\go()->getDbConnection()->update('bs_items', [
			'order_at_supplier_company_id' => new \go\core\db\Expression('order_at_supplier_company_id + '.$increment)
			], 
					'order_at_supplier_company_id > 0 AND order_at_supplier_company_id IS NOT NULL')
					->execute();
	
	\go()->getDbConnection()->update('bs_products', [
			'supplier_company_id' => new \go\core\db\Expression('supplier_company_id + '.$increment)
			], 
					'supplier_company_id > 0 AND supplier_company_id IS NOT NULL')
					->execute();
};


$updates['201910231154'][] = "ALTER TABLE `bs_orders` CHANGE `contact_id` `contact_id` INT(11) NULL DEFAULT NULL;";
$updates['201910231154'][] = "update bs_orders set contact_id = null where contact_id not in (select id from addressbook_contact);";
$updates['201910231154'][] = "ALTER TABLE `bs_orders` ADD FOREIGN KEY (`contact_id`) REFERENCES `addressbook_contact`(`id`) ON DELETE SET NULL ON UPDATE RESTRICT;";

$updates['201910231154'][] = "ALTER TABLE `bs_orders` CHANGE `company_id` `company_id` INT(11) NULL DEFAULT NULL;";
$updates['201910231154'][] = "update bs_orders set company_id = null where company_id not in (select id from addressbook_contact);";
$updates['201910231154'][] = "ALTER TABLE `bs_orders` ADD FOREIGN KEY (`company_id`) REFERENCES `addressbook_contact`(`id`) ON DELETE SET NULL ON UPDATE RESTRICT;";

$updates["202007061403"][] = "ALTER TABLE  `bs_expenses` CHANGE  `invoice_no`  `invoice_no` VARCHAR( 100 ) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '';";
