<?php

$cron = new \GO\Base\Cron\CronJob();
		
$cron->name = 'Sent tickets due reminder';
$cron->active = true;
$cron->runonce = false;
$cron->minutes = '0';
$cron->hours = '1';
$cron->monthdays = '*';
$cron->months = '*';
$cron->weekdays = '*';
$cron->job = 'GO\Tickets\Cron\DueMailer';

$cron->save();