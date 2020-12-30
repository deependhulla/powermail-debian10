#!/bin/bash


## backup existing repo by copy
/bin/cp -pR /etc/apt/sources.list /usr/local/src/old-sources.list-`date +%s`
echo "" >  /etc/apt/sources.list
echo "deb http://httpredir.debian.org/debian buster main contrib non-free" >> /etc/apt/sources.list
echo "deb http://httpredir.debian.org/debian buster-updates main contrib non-free" >> /etc/apt/sources.list
echo "deb http://security.debian.org/ buster/updates main contrib non-free" >> /etc/apt/sources.list

apt-get update
apt-get -y upgrade
apt-get -y install vim git
#mkdir /opt ; cd /opt ; git clone https://github.com/deependhulla/powermail-debian10.git 

hostname -f
ping `hostname -f` -c 2


