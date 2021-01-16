<?php
$cron = new \GO\Base\Cron\CronJob();
		
$cron->name = 'Close inactive tickets';
$cron->active = true;
$cron->runonce = false;
$cron->minutes = '0';
$cron->hours = '2';
$cron->monthdays = '*';
$cron->months = '*';
$cron->weekdays = '*';
$cron->job = 'GO\Tickets\Cron\CloseInactive';

$cron->save();
