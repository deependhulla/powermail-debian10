#!/bin/bash

echo "deb http://download.webmin.com/download/repository sarge contrib " > /etc/apt/sources.list.d/webmin.list
curl -s http://www.webmin.com/jcameron-key.asc | apt-key add -

apt update
apt install -y webmin 

## change port from 10000 to 8383
sed -i "s/10000/8383/g" /etc/webmin/miniserv.conf
/etc/init.d/webmin restart


WEPASSVPOP=`pwgen -c -1 8`
echo $WEPASSVPOP > /usr/local/src/manager-powermail-pass
/usr/share/webmin/changepass.pl  /etc/webmin manager `cat /usr/local/src/manager-powermail-pass`

