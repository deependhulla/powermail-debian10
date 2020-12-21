#
# MailWatch for MailScanner
#

package MailScanner::CustomConfig;

use warnings;
use strict;

# Change the values below to match the MailWatch database settings as set in conf.php
my ($db_name) = 'mailscanner';
my ($db_host) = 'localhost';
my ($db_user) = 'mailscanner';
my ($db_pass) = 'zaohm8ahC2';

# Change the value below for SQLSpamSettings.pm (default = 15)
my ($ss_refresh_time) = 15;       # Time in minutes before lists are refreshed

# Change the value below for SQLBlackWhiteList.pm (default = 15)
my ($bwl_refresh_time) = 15;      # Time in minutes before lists are refreshed


###############################
# don't touch below this line #
###############################

sub mailwatch_get_db_name { return $db_name };
sub mailwatch_get_db_host { return $db_host };
sub mailwatch_get_db_user { return $db_user };
sub mailwatch_get_db_password { return $db_pass };
sub mailwatch_get_BWL_refresh_time { return $bwl_refresh_time };
sub mailwatch_get_SS_refresh_time { return $ss_refresh_time };

1;
