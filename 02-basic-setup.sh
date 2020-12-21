#!/bin/sh


##disable ipv6 as most time not required
sysctl -w net.ipv6.conf.all.disable_ipv6=1 1>/dev/null
sysctl -w net.ipv6.conf.default.disable_ipv6=1 1>/dev/null

#build rc.local as it not there by default in  10.x
/bin/cp -pR /etc/rc.local /usr/local/old-rc.local-`date +%s` 2>/dev/null
touch /etc/rc.local 
printf '%s\n' '#!/bin/bash'  | tee -a /etc/rc.local 1>/dev/null
echo "sysctl -w net.ipv6.conf.all.disable_ipv6=1" >>/etc/rc.local
echo "sysctl -w net.ipv6.conf.default.disable_ipv6=1" >> /etc/rc.local
echo "exit 0" >> /etc/rc.local
chmod 755 /etc/rc.local
## need like autoexe bat on startup
echo "[Unit]" > /etc/systemd/system/rc-local.service
echo " Description=/etc/rc.local Compatibility" >> /etc/systemd/system/rc-local.service
echo " ConditionPathExists=/etc/rc.local" >> /etc/systemd/system/rc-local.service
echo "" >> /etc/systemd/system/rc-local.service
echo "[Service]" >> /etc/systemd/system/rc-local.service
echo " Type=forking" >> /etc/systemd/system/rc-local.service
echo " ExecStart=/etc/rc.local start" >> /etc/systemd/system/rc-local.service
echo " TimeoutSec=0" >> /etc/systemd/system/rc-local.service
echo " StandardOutput=tty" >> /etc/systemd/system/rc-local.service
echo " RemainAfterExit=yes" >> /etc/systemd/system/rc-local.service
echo " SysVStartPriority=99" >> /etc/systemd/system/rc-local.service
echo "" >> /etc/systemd/system/rc-local.service
echo "[Install]" >> /etc/systemd/system/rc-local.service
echo " WantedBy=multi-user.target" >> /etc/systemd/system/rc-local.service

systemctl enable rc-local
systemctl start rc-local

## ssh Keep Alive
mkdir /root/.ssh 2>/dev/null 
echo "Host * " > /root/.ssh/config
echo "    ServerAliveInterval 30" >> /root/.ssh/config
echo "    ServerAliveCountMax 20" >> /root/.ssh/config
# for other new users
mkdir /etc/skel/.ssh 2>/dev/null
echo "Host * " > /etc/skel/.ssh/config
echo "    ServerAliveInterval 30" >> /etc/skel/.ssh/config
echo "    ServerAliveCountMax 20" >> /etc/skel/.ssh/config

apt-get update

CFG_HOSTNAME_FQDN=`hostname -f`
echo "postfix postfix/main_mailer_type select Internet Site" | debconf-set-selections
echo "postfix postfix/mailname string $CFG_HOSTNAME_FQDN" | debconf-set-selections
echo iptables-persistent iptables-persistent/autosave_v4 boolean true | sudo debconf-set-selections
echo iptables-persistent iptables-persistent/autosave_v6 boolean true | sudo debconf-set-selections


apt-get -y install postfix openssh-server vim iptraf screen mc net-tools sshfs telnet iputils-ping git psmisc apt-transport-https curl bind9 curl elinks xfsprogs debconf-utils pwgen ca-certificates gnupg2 wget unzip zip software-properties-common htop fetchmail iptables-persistent redis-server imagemagick mariadb-server postfix-mysql dovecot-mysql dovecot-sieve dovecot-managesieved dovecot-imapd dovecot-pop3d dovecot-sieve dovecot-antispam sendemail postfix-pcre postfwd whois opendkim opendkim-tools certbot python-certbot-apache apache2 ftp mcrypt clamav clamav-unofficial-sigs clamav-daemon tnef poppler-utils build-essential 
apt-get -y upgrade

systemctl stop bind9 2>/dev/null
systemctl disable bind9 2>/dev/null


## make cpan auto yes for pre-requist modules of perl
(echo y;echo o conf prerequisites_policy follow;echo o conf commit)|cpan 1>/dev/null

##ipv4 iptables rules saved in /etc/iptables/rules.v4

#Disable vim automatic visual mode using mouse
echo "\"set mouse=a/g" >  ~/.vimrc
echo "syntax on" >> ~/.vimrc
##  for  other new users
echo "\"set mouse=a/g" >  /etc/skel/.vimrc
echo "syntax on" >> /etc/skel/.vimrc

## centos 7 like bash ..for all inteactive 
echo "" >> /etc/bash.bashrc
echo "alias cp='cp -i'" >> /etc/bash.bashrc
echo "alias l.='ls -d .* --color=auto'" >> /etc/bash.bashrc
echo "alias ll='ls -l --color=auto'" >> /etc/bash.bashrc
echo "alias ls='ls --color=auto'" >> /etc/bash.bashrc
echo "alias mv='mv -i'" >> /etc/bash.bashrc
echo "alias rm='rm -i'" >> /etc/bash.bashrc


#Load bashrc
bash
source /etc/bash.bashrc




