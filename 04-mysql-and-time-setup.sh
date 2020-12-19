#!/bin/bash



systemctl restart mysql

MYSQLPASSVPOP=`pwgen -c -1 8`
echo $MYSQLPASSVPOP > /usr/local/src/mysql-admin-pass
echo "mysql admin password in /usr/local/src/mysql-admin-pass"

echo "GRANT ALL PRIVILEGES ON *.* TO admin@localhost IDENTIFIED BY '$MYSQLPASSVPOP'" with grant option | mysql -uroot
mysqladmin -uroot reload
mysqladmin -uroot refresh

### Time Server Setup
echo "NTP=0.arch.pool.ntp.org 1.arch.pool.ntp.org 2.arch.pool.ntp.org 3.arch.pool.ntp.org" >> /etc/systemd/timesyncd.conf
timedatectl set-timezone 'Asia/Kolkata'
timedatectl set-ntp true
timedatectl status


### changing timezone to Asia Kolkata
sed -i "s/;date.timezone =/date\.timezone \= \'Asia\/Kolkata\'/" /etc/php/7.4/apache2/php.ini
sed -i "s/;date.timezone =/date\.timezone \= \'Asia\/Kolkata\'/" /etc/php/7.4/fpm/php.ini
sed -i "s/;date.timezone =/date\.timezone \= \'Asia\/Kolkata\'/" /etc/php/7.4/cli/php.ini

sed -i "s/error_reporting = E_ALL & ~E_DEPRECATED & ~E_STRICT/error_reporting = E_ERROR/" /etc/php/7.4/cli/php.ini
sed -i "s/error_reporting = E_ALL & ~E_DEPRECATED & ~E_STRICT/error_reporting = E_ERROR/" /etc/php/7.4/fpm/php.ini
sed -i "s/error_reporting = E_ALL & ~E_DEPRECATED & ~E_STRICT/error_reporting = E_ERROR/" /etc/php/7.4/apache2/php.ini


## restart rsyslog show that mail.log shows proper time
systemctl restart  systemd-timedated systemd-timesyncd mysql rsyslog apache2


