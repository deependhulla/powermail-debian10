<?php
$cron = new \GO\Base\Cron\CronJob();
		
$cron->name = 'Filesearch index';
$cron->active = true;
$cron->runonce = false;
$cron->minutes = '0';
$cron->hours = '1';
$cron->monthdays = '*';
$cron->months = '*';
$cron->weekdays = '*';
$cron->job = 'GO\Filesearch\Cron\FileIndex';		

$cron->save();
