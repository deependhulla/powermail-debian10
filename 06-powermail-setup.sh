#!/bin/sh

echo `hostname -f` > /etc/mailname
## adding 89 so that migration from qmailtoaster setup is easier.
groupadd -g 89 vmail 2>/dev/null
useradd -g vmail -u 89 -d /home/powermail vmail 2>/dev/null
## take one etc backup for safety
sh files/rootdir/bin/etc-config-backup.sh

touch /var/log/dovecot.log
touch /var/log/clamav/clamav.log
chmod 666 /var/log/dovecot.log
chmod 666 /var/log/clamav/clamav.log

mkdir /home/groupoffice/ 2>/dev/null
chmod 777 /home/groupoffice/
chown -R www-data:www-data /home/groupoffice/

sed -i "s/SOCKET\=local\:\$RUNDIR\/opendkim.sock/#SOCKET\=local\:\$RUNDIR\/opendkim.sock/" /etc/default/opendkim
sed -i "s/#SOCKET\=inet\:12345\@localhost/SOCKET\=inet\:12345\@localhost/" /etc/default/opendkim
/lib/opendkim/opendkim.service.generate
systemctl daemon-reload

MYSQLPASSVPOP=`pwgen -c -1 8`
echo $MYSQLPASSVPOP > /usr/local/src/mysql-powermail-pass
mysqladmin create powermail -uroot 1>/dev/null 2>/dev/null
echo "GRANT ALL PRIVILEGES ON powermail.* TO powermail@localhost IDENTIFIED BY '$MYSQLPASSVPOP'" | mysql -uroot
mysqladmin -uroot reload
mysqladmin -uroot refresh

/bin/cp -pR files/rootdir/* /
chown -R vmail:vmail /home/powermail
systemctl restart  rsyslog
# dowload latest for checking ip when attack for country
/usr/local/src/ip-to-location/download-latest-ip-db.sh

## remove different mail log files and reset one used
echo > /var/log/mail.log
/bin/rm -rf /var/log/mail.info
/bin/rm -rf /var/log/mail.warn
/bin/rm -rf /var/log/mail.err

## instead of exim add powermail
sed -i "s/exim/powermail/g" /etc/webmin/webmin.acl

echo "manager:xxxxxjpihs:0" >> /etc/webmin/miniserv.users
echo "manager:powermail postfix custom" >>  /etc/webmin/webmin.acl

WEPASSVPOP=`pwgen -c -1 8`
echo $WEPASSVPOP > /usr/local/src/manager-powermail-pass
/usr/share/webmin/changepass.pl  /etc/webmin manager `cat /usr/local/src/manager-powermail-pass`

mysql < files/powermaildb.sql
mysql < files/powermail-extra-features.sql


sed -i "s/ohm8ahC2/`cat /usr/local/src/mysql-powermail-pass`/" /etc/postfix/sql/mysql_relay_domains_maps.cf
sed -i "s/ohm8ahC2/`cat /usr/local/src/mysql-powermail-pass`/" /etc/postfix/sql/mysql_virtual_alias_domain_catchall_maps.cf
sed -i "s/ohm8ahC2/`cat /usr/local/src/mysql-powermail-pass`/" /etc/postfix/sql/mysql_virtual_alias_domain_mailbox_maps.cf
sed -i "s/ohm8ahC2/`cat /usr/local/src/mysql-powermail-pass`/" /etc/postfix/sql/mysql_virtual_alias_domain_maps.cf
sed -i "s/ohm8ahC2/`cat /usr/local/src/mysql-powermail-pass`/" /etc/postfix/sql/mysql_virtual_alias_maps.cf
sed -i "s/ohm8ahC2/`cat /usr/local/src/mysql-powermail-pass`/" /etc/postfix/sql/mysql_virtual_domains_maps.cf
sed -i "s/ohm8ahC2/`cat /usr/local/src/mysql-powermail-pass`/" /etc/postfix/sql/mysql_virtual_mailbox_limit_maps.cf
sed -i "s/ohm8ahC2/`cat /usr/local/src/mysql-powermail-pass`/" /etc/postfix/sql/mysql_virtual_mailbox_maps.cf
sed -i "s/ohm8ahC2/`cat /usr/local/src/mysql-powermail-pass`/" /etc/dovecot/dovecot-sql.conf.ext
sed -i "s/ohm8ahC2/`cat /usr/local/src/mysql-powermail-pass`/" /etc/dovecot/dovecot-dict-sql.conf.ext
sed -i "s/ohm8ahC2/`cat /usr/local/src/mysql-powermail-pass`/" /etc/dovecot/dovecot-lastlogin-map.ext
sed -i "s/powermail\.mydomainname\.com/`hostname -f`/" /etc/postfix/main.cf
sed -i "s/ohm8ahC2/`cat /usr/local/src/mysql-powermail-pass`/" /home/powermail/etc/powermail.mysql
sed -i "s/powermail\.mydomainname\.com/`hostname -f`/" /etc/dovecot/conf.d/10-ssl.conf
sed -i "s/powermail\.mydomainname\.com/`hostname -f`/" /etc/apache2/sites-available/default-ssl.conf


chown -R www-data:www-data /var/www/html

echo "Working on importing GroupOffice MySQL database..."
MYSQLPASSVPOP=`pwgen -c -1 8`
echo $MYSQLPASSVPOP > /usr/local/src/mysql-groupofficedb-pass
## need to autogen

mysqladmin create groupoffice -uroot
echo "GRANT ALL PRIVILEGES ON groupoffice.* TO groupoffice@localhost IDENTIFIED BY '$MYSQLPASSVPOP'" | mysql -uroot
mysqladmin -uroot  reload
mysqladmin -uroot  refresh

/bin/cp -p files/groupoffice-db.sql /tmp/groupoffice-db-tmp.sql
sed -i "s/powermail\.mydomainname\.com/`hostname -f`/" /tmp/groupoffice-db-tmp.sql
mysql < /tmp/groupoffice-db-tmp.sql
/bin/rm -rf /tmp/groupoffice-db-tmp.sql 1>/dev/null 2>/dev/null

sed -i "s/ohm8ahC2/`cat /usr/local/src/mysql-groupofficedb-pass`/" /var/www/html/groupoffice/config.php
##groupofficeadmin password set
GOPASSVPOP=`pwgen -c -1 8`
echo $GOPASSVPOP > /usr/local/src/groupofficeadmin-pass

php /usr/local/src/groupoffice64-groupofficeadmin-password-reset.php 


/home/powermail/bin/vadddomain `hostname -f`
/home/powermail/bin/vaddalias root@`hostname -f` postmaster@`hostname -f`
/home/powermail/bin/vaddalias clamav@`hostname -f` postmaster@`hostname -f`
/home/powermail/bin/vaddalias abuse@`hostname -f` postmaster@`hostname -f`
/home/powermail/bin/vaddalias fbl@`hostname -f` postmaster@`hostname -f`

