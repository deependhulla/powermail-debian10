#!/bin/sh
wget -c "https://files.phpmyadmin.net/phpMyAdmin/4.9.7/phpMyAdmin-4.9.7-english.tar.gz" -O /opt/phpMyAdmin-4.9.7-english.tar.gz

cd /opt
tar -xvzf phpMyAdmin-4.9.7-english.tar.gz 
cd -
mv -v /opt/phpMyAdmin-4.9.7-english /var/www/html/dbadminonweb

cp /var/www/html/dbadminonweb/config.sample.inc.php /var/www/html/dbadminonweb/config.inc.php

sed -i "s/\$cfg\['blowfish_secret'\] = '';/\$cfg\['blowfish_secret'\] = '`pwgen -c 32 1`';/" /var/www/html/dbadminonweb/config.inc.php

