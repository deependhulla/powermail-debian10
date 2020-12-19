#!/bin/sh

files/rootdir/bin/etc-config-backup.sh

dpkg -i files/mailscanner-files/MailScanner-5.3.3-1.noarch.deb

#To finish configuring MailScanner, edit the following files:
#/etc/MailScanner/defaults
#/etc/MailScanner/MailScanner.conf

## ms-ocinfigure
## copt etc folder

files/extra-perl-modules.sh

#systemctl start mailscanner.service
#systemctl enable msmilter.service
#systemctl start msmilter.service

systemctl disable spampd 1>/dev/null 2>/dev/null 

/bin/cp -pRv files/mailscanner-files/header_checks /etc/postfix/header_checks
## disabled amavis if got installed
postconf -e 'content_filter = '

/bin/cp -pRv files/mailscanner-files/MailScanner-etc/* /etc/MailScanner/

touch /etc/MailScanner/archives.filetype.rules.conf
touch /etc/MailScanner/archives.filename.rules.conf
touch /etc/MailScanner/filename.rules.conf
mkdir /var/spool/MailScanner/incoming 2>/dev/null
mkdir /var/spool/MailScanner/quarantine 2>/dev/null
mkdir /var/spool/MailScanner/incoming/Locks 2>/dev/null
chown postfix.postfix /var/spool/MailScanner/incoming
chown postfix.postfix /var/spool/MailScanner/quarantine
chown postfix:root /var/spool/postfix/

## so that mailwatch can read
chmod 744 /var/spool/postfix/incoming/
chmod 744 /var/spool/postfix/hold/
chown -R postfix  /var/log/clamav
## Mail-Archive Tool
mkdir /mail-archive-uncompress 2>/dev/null
mkdir /mail-archive-compress 2>/dev/null
mkdir /mail-archive-process 2>/dev/null
chmod 666 /mail-archive-uncompress
chmod 666 /mail-archive-compress
chmod 666 /mail-archive-process

MYSQLPASSMAILW=`pwgen -c -1 8`
echo $MYSQLPASSMAILW > /usr/local/src/mysql-mailscanner-pass

echo "Creating Database mailscanner for storing all logs for mailwatch"
mysqladmin create mailscanner -uroot
mysql < files/mailscanner-files/MailWatch-1.2.15/create.sql

echo "GRANT ALL PRIVILEGES ON mailscanner.* TO mailscanner@localhost IDENTIFIED BY '$MYSQLPASSMAILW'" | mysql -uroot
mysqladmin -uroot reload
mysqladmin -uroot refresh

MYSQLPASSMW=`pwgen -c -1 8`
echo $MYSQLPASSMW > /usr/local/src/mailwatch-admin-pass

echo "adding user mailwatch with password for gui access , password in /usr/local/src/mailwatch-admin-pass";
echo "INSERT INTO \`mailscanner\`.\`users\` (\`username\`, \`password\`, \`fullname\`, \`type\`, \`quarantine_report\`, \`spamscore\`, \`highspamscore\`, \`noscan\`, \`quarantine_rcpt\`) VALUES ('mailwatch', MD5('$MYSQLPASSMW'), 'Mail Admin', 'A', '0', '0', '0', '0', NULL);"  | mysql;


/bin/cp -pR files/mailscanner-files/MailWatch-1.2.15/MailScanner_perl_scripts/*.pm /usr/share/MailScanner/perl/custom/
/bin/cp -pR files/mailscanner-files/MailWatch-1.2.15/tools/Cron_jobs/*.php /usr/local/bin/
/bin/cp -pR files/mailscanner-files/MailWatch-1.2.15/tools/Postfix_relay/*.php /usr/local/bin/
/bin/cp -pR files/mailscanner-files/MailWatch-1.2.15/tools/Postfix_relay/mailwatch-postfix-relay /usr/local/bin/
/bin/cp -pR files/mailscanner-files/MailWatch-1.2.15/tools/Cron_jobs/mailwatch /etc/cron.daily/ 
/bin/cp -pR files/mailscanner-files/MailWatch-1.2.15/mailscanner /var/www/html/
chown -R www-data:www-data /var/www/html/mailscanner/

sed -i "s/zaohm8ahC2/`cat /usr/local/src/mysql-mailscanner-pass`/" /var/www/html/mailscanner/conf.php
sed -i "s/zaohm8ahC2/`cat /usr/local/src/mysql-mailscanner-pass`/" /usr/share/MailScanner/perl/custom/MailWatchConf.pm
sed -i "s/powermail\.mydomainname\.com/`hostname`/" /var/www/html/mailscanner/conf.php
sed -i "s/powermail\.mydomainname\.com/`hostname`/"   /etc/MailScanner/MailScanner.conf
chmod 666 /var/spool/MailScanner/incoming/SpamAssassin.cache.db
