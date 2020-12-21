<?php
/**
 * Remove the [ts #{TICKET#}] identifier from the subject line because from now on it will be added hardcoded in front of the subject
 */

$settings = \GO\Tickets\Model\Settings::model()->findModel();
$settings->subject = preg_replace( '/\[ts #([^\]]+)\]/','',$settings->subject); // Remove the [ts #{TICKET#}] identifier
$settings->subject = trim($settings->subject); // Remove spaces
$settings->save();
