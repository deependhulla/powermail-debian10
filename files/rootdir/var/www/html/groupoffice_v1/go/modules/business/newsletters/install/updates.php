<?php

$updates = [];
$updates['202001131135'][] = "ALTER TABLE `newsletters_newsletter` ADD `lastMessageSentAt` DATETIME NULL DEFAULT NULL AFTER `finishedAt`;";
$updates['202001131135'][] = "update newsletters_newsletter set `lastMessageSentAt` = finishedAt;";
