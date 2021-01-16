<?php

use GO\Base\Db\FindCriteria;
use GO\Base\Db\FindParams;
use GO\Tickets\Model\Ticket;
use GO\Tickets\Model\Message;




try {
	$query = "ALTER TABLE `core_user` ADD `recovery_email` VARCHAR(100) NULL DEFAULT NULL;";
 	\GO::getDbConnection()->query($query);
} catch (\PDOException $e) {
	echo $e->getMessage() . "\n";
	echo "Query: " . $query;
}


$findParams = FindParams::newInstance()
				->joinRelation('type');

$findParams->getCriteria()						
						->addCondition('status_id', Ticket::STATUS_CLOSED, '!=');

$tickets = Ticket::model()->find($findParams); 

foreach ($tickets as $ticket) {
	$last_agent_response_time = $ticket->ctime;
	$last_contact_response_time = $ticket->ctime;
	
	foreach ($ticket->messages as $message) {
		if($message->is_note) {
			continue;
		}
		
		if($message->user_id != $ticket->user_id) {
			if($last_agent_response_time < $message->ctime)
				$last_agent_response_time = $message->ctime;
		} else {
			if($last_contact_response_time < $message->ctime)
				$last_contact_response_time = $message->ctime;
		}	
		
		if($ticket->ctime  > $last_agent_response_time && $ticket->ctime > $last_contact_response_time) {
			break;
		}
		
	}
	$ticket->last_agent_response_time = $last_agent_response_time;
	$ticket->last_contact_response_time = $last_contact_response_time;
	
	
	$oldMtime = $ticket->mtime;
	$ticket->mtime = 0; //to trigger modified attributes
 	$ticket->mtime = $oldMtime ;
	
	$ticket->save();
	
}
