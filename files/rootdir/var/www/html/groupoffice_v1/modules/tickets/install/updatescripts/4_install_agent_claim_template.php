<?php

$template = new \GO\Tickets\Model\Template();
$template->name = \GO::t("Default mail for agent claim", "tickets");
$template->content = \GO::t("{AGENT} just picked up your ticket and is working on it. We'll keep you up to date about our progress.", "tickets");
$template->user_id = 1;
$template->autoreply = 0;
$template->default_template = 0;
$template->ticket_created_for_client = 0;
$template->ticket_mail_for_agent = 0;
$template->ticket_claim_notification = 1;
$template->save();
