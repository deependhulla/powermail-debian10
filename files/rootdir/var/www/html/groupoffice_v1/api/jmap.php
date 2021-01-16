<?php
use go\core\App;
use go\core\jmap\Router;
use go\core\jmap\Request;
use go\core\jmap\State;

require("../vendor/autoload.php");

//Create the app with the database connection
App::get()->setAuthState(new State());

if(Request::get()->getMethod() === 'POST') {	
	$router = new Router();
	$router->run();
} elseif (Request::get()->getMethod() === 'GET') {
	App::get()->getAuthState()->outputSession();
} else
{
	echo "Method " . Request::get()->getMethod() . " not supported";
}
