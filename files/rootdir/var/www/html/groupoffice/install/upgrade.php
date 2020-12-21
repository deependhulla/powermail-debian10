<?php
use go\core\ErrorHandler;
use go\core\db\Table;
use go\core\orm\Query;

ini_set('zlib.output_compression', 0);
ini_set('implicit_flush', 1);

try {
	
	require('../vendor/autoload.php');
	\go\core\App::get();

	require("gotest.php");
	if(!systemIsOk()) {
		header("Location: test.php");
		exit();
	}

	go()->setCache(new \go\core\cache\None());

	require('header.php');

	echo "<section><div class=\"card\">";

	go()->getInstaller()->isValidDb();

	Table::destroyInstances();
	
	$unavailable = go()->getInstaller()->getUnavailableModules();

	if (!isset($_GET['confirmed'])) {
	
		echo "<h2>". go()->t("Upgrade Group-Office") ."</h2><p>";
		echo "Please <b>BACKUP</b> your database and files before proceeding. Your database is going to be upgraded and all caches will be cleared.<br />This operation can only be undone by restoring a backup.<br />";
		
		echo 'More details about this upgrade can be found in the <a target="_blank" href="https://github.com/Intermesh/groupoffice/blob/' . go()->getMajorVersion()  . '.x/CHANGELOG.md">change log</a>.<br /><br />';

		echo "Note: You can also upgrade on the command line by running (replace www-data with the user of your webserver): <br />

			<code>sudo -u www-data php cli.php core/System/upgrade</code>

			";


		
		echo "</p></div>";
		echo '<a class="button" href="?confirmed=1">Upgrade database</a>';
	} elseif (!isset($_GET['ignore']) && count($unavailable)) {
	
		echo "<h2>". go()->t("Upgrade Group-Office") ."</h2>";

		echo "<p>The following modules are not available because they're missing on disk\n"
		. "or you've got an <b>invalid or missing license file</b>: </p>"
		. "<ul style=\"font-size:1.5em\"><li>" . implode("</li><li>", array_map(function($a){return ($a['package'] ?? "legacy") .'/'.$a['name'];}, $unavailable)) . "</li></ul>\n"
		. "<p>Please install the license file(s) and refresh this page or disable these modules.\n"
		. "If you continue the incompatible modules will be disabled.</p>";
		
		
		echo "</div>";
		echo '<a class="button" href="?ignore=modules&confirmed=1">Disable &amp; Continue</a>';

	} else
	{

		echo "<h2>". go()->t("Upgrade Group-Office") ."</h2><pre>";

		go()->getInstaller()->upgrade();	

		echo "</pre></div>";

		echo '<a class="button" href="../">' . go()->t('Continue') . '</a>';

		if(go()->getDebugger()->enabled) {
			echo "<div style=\"clear:both;margin-bottom:20px;\"></div><div class=\"card\"><h2>Debugger output</h2><pre style=\"max-height: 600px; overflow:scroll;\">" ;
			go()->getDebugger()->printEntries();
			echo "</pre></div>";
		}


	} 
} catch (Exception $e) {
	echo "<b>Error:</b> ". ErrorHandler::logException($e)."\n\n";
	
	if(go()->getDebugger()->enabled) {
		echo $e->getTraceAsString();
	}
	
	echo "</pre></div>";
	
	if(go()->getDebugger()->enabled) {
		echo "<div style=\"clear:both;margin-bottom:20px;\"></div><div class=\"card\"><h2>Debugger output</h2><pre>";
		
		go()->getDebugger()->printEntries();
		
		echo "</pre></div>";
	}
	
	echo "</section>";
}

require('footer.php');