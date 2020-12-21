#!/bin/sh

wget https://github.com/MailScanner/v5/releases/download/5.3.4-3/MailScanner-5.3.4-3.noarch.deb -O /opt/MailScanner-5.3.4-3.noarch.deb
wget -c https://github.com/MailScanner/v5/releases/download/5.3.4-3/MailScanner-5.3.4-3.noarch.deb.sig -O /opt/MailScanner-5.3.4-3.noarch.deb.sig
sh files/extra-perl-modules.sh

dpkg -i /opt/MailScanner-5.3.4-3.noarch.deb

/usr/sbin/ms-configure

sed -i "s/run_mailscanner=0/run_mailscanner=1/" /etc/MailScanner/defaults 
/bin/cp -pRv files/mailscanner-files/header_checks /etc/postfix/header_checks

touch /etc/MailScanner/archives.filetype.rules.conf
touch /etc/MailScanner/archives.filename.rules.conf
touch /etc/MailScanner/filename.rules.conf
mkdir /var/spool/MailScanner/incoming 2>/dev/null
mkdir /var/spool/MailScanner/quarantine 2>/dev/null
mkdir /var/spool/MailScanner/incoming/Locks 2>/dev/null
chown postfix.postfix /var/spool/MailScanner/incoming
chown postfix.postfix /var/spool/MailScanner/quarantine
chown postfix:root /var/spool/postfix/

/bin/cp -pRv files/mailscanner-files/ms-etc/* /etc/MailScanner/

## so that mailwatch can read
chmod 744 /var/spool/postfix/incoming/
chmod 744 /var/spool/postfix/hold/
chown -R postfix  /var/log/clamav
## Mail-Archive Tool
mkdir /mail-archive-data
mkdir /mail-archive-data/mail-archive-uncompress 2>/dev/null
mkdir /mail-archive-data/mail-archive-compress 2>/dev/null
mkdir /mail-archive-data/mail-archive-process 2>/dev/null
chmod 666 /mail-archive-data
chmod 666 /mail-archive-data/mail-archive-uncompress
chmod 666 /mail-archive-data/mail-archive-compress
chmod 666 /mail-archive-data/mail-archive-process
chmod 666 /var/spool/MailScanner/incoming/SpamAssassin.cache.db

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

sed -i "s/zaohm8ahC2/`cat /usr/local/src/mysql-mailscanner-pass`/" /var/www/html/mailscanner/conf.php
sed -i "s/zaohm8ahC2/`cat /usr/local/src/mysql-mailscanner-pass`/" /usr/share/MailScanner/perl/custom/MailWatchConf.pm
sed -i "s/powermail\.mydomainname\.com/`hostname`/" /var/www/html/mailscanner/conf.php
sed -i "s/powermail\.mydomainname\.com/`hostname`/"   /etc/MailScanner/MailScanner.conf

service mailscanner restart

