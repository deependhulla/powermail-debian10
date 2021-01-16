<?php

$template = new \GO\Tickets\Model\Template();
$template->name = \GO::t("Default mail for agent", "tickets");
$template->content = \GO::t("Number: {NUMBER}
Subject: {SUBJECT}
Created by: {CREATEDBY}
Company: {COMPANY}

URL: {LINK}

{MESSAGE}", "tickets");
$template->user_id = 1;
$template->autoreply = 0;
$template->default_template = 0;
$template->ticket_created_for_client = 0;
$template->ticket_mail_for_agent = 1;
$template->save();
