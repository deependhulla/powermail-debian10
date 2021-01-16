MYSQLPASSMAILW=`pwgen -c -1 8`
echo $MYSQLPASSMAILW > /usr/local/src/mysql-mailscanner-pass

echo "Creating Database mailscanner for storing all logs for mailwatch"
mysqladmin create mailscanner -uroot
mysql < files/mailscanner-files/MailWatch-1.2.16/create.sql

echo "GRANT ALL PRIVILEGES ON mailscanner.* TO mailscanner@localhost IDENTIFIED BY '$MYSQLPASSMAILW'" | mysql -uroot
mysqladmin -uroot reload
mysqladmin -uroot refresh

MYSQLPASSMW=`pwgen -c -1 8`
echo $MYSQLPASSMW > /usr/local/src/mailwatch-admin-pass

echo "adding user mailwatch with password for gui access , password in /usr/local/src/mailwatch-admin-pass";
echo "INSERT INTO \`mailscanner\`.\`users\` (\`username\`, \`password\`, \`fullname\`, \`type\`, \`quarantine_report\`, \`spamscore\`, \`highspamscore\`, \`noscan\`, \`quarantine_rcpt\`) VALUES ('mailwatch', MD5('$MYSQLPASSMW'), 'Mail Admin', 'A', '0', '0', '0', '0', NULL);"  | mysql;


/bin/cp -pR files/mailscanner-files/MailWatch-1.2.16/MailScanner_perl_scripts/*.pm /usr/share/MailScanner/perl/custom/
/bin/cp -pR files/mailscanner-files/MailWatch-1.2.16/tools/Cron_jobs/*.php /usr/local/bin/
/bin/cp -pR files/mailscanner-files/MailWatch-1.2.16/tools/Postfix_relay/*.php /usr/local/bin/
/bin/cp -pR files/mailscanner-files/MailWatch-1.2.16/tools/Postfix_relay/mailwatch-postfix-relay /usr/local/bin/
/bin/cp -pR files/mailscanner-files/MailWatch-1.2.16/tools/Cron_jobs/mailwatch /etc/cron.daily/
/bin/cp -pR files/mailscanner-files/MailWatch-1.2.16/mailscanner /var/www/html/
chown -R www-data:www-data /var/www/html/mailscanner/
chmod 666 /var/spool/MailScanner/incoming/SpamAssassin.cache.db

sed -i "s/zaohm8ahC2/`cat /usr/local/src/mysql-mailscanner-pass`/" /var/www/html/mailscanner/conf.php
sed -i "s/zaohm8ahC2/`cat /usr/local/src/mysql-mailscanner-pass`/" /usr/share/MailScanner/perl/custom/MailWatchConf.pm
sed -i "s/powermail\.mydomainname\.com/`hostname`/" /var/www/html/mailscanner/conf.php
sed -i "s/powermail\.mydomainname\.com/`hostname`/"   /etc/MailScanner/MailScanner.conf

service mailscanner restart
