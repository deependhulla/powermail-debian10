#!/bin/bash

echo "deb [arch=amd64] https://packages.sury.org/php/ $(lsb_release -cs) main" > /etc/apt/sources.list.d/php7-4.list
wget -q https://packages.sury.org/php/apt.gpg -O- | apt-key add -


apt update
apt-get -y upgrade

apt-get install -y  apache2 php7.4-fpm php7.4-imap php7.4-gd php7.4-mysql php7.4-curl php7.4-xml php7.4-zip php7.4-intl php7.4-mbstring php7.4-json php7.4-bz2 php7.4-ldap php7.4-apcu php7.4-cli php7.4-bcmath libapache2-mod-fcgid  libapache2-mod-php7.4


a2enmod actions > /dev/null 2>&1
a2enmod proxy_fcgi > /dev/null 2>&1
a2enmod fcgid > /dev/null 2>&1
a2enmod alias > /dev/null 2>&1
a2enmod suexec > /dev/null 2>&1
a2enmod rewrite > /dev/null 2>&1
a2enmod ssl > /dev/null 2>&1
a2enmod actions > /dev/null 2>&1
a2enmod include > /dev/null 2>&1
a2enmod dav_fs > /dev/null 2>&1
a2enmod dav > /dev/null 2>&1
a2enmod auth_digest > /dev/null 2>&1
a2enmod cgi > /dev/null 2>&1
a2enmod headers > /dev/null 2>&1
a2enmod proxy_http > /dev/null 2>&1

