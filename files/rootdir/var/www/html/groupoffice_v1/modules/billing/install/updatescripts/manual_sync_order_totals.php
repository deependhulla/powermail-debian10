<?php
if(isset($argv[1]))
{
    define('CONFIG_FILE', $argv[1]);
}

chdir(dirname(__FILE__));

require('../../../../Group-Office.php');

if(php_sapi_name()!='cli')
{
	$GLOBALS['GO_SECURITY']->authenticate();
	if(!$GLOBALS['GO_SECURITY']->has_admin_permission($GLOBALS['GO_SECURITY']->user_id))
	{
		die('You must be logged in as admin or run it from the command line');
	}
}


$db = new db();
$db->halt_on_error='report';
//suppress duplicate and drop errors
$db->suppress_errors=array(1060, 1091);

ini_set('max_execution_time', '3600');

require('3_sync_orders_totals.inc.php');
