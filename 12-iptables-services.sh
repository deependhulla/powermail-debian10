#!/bin/sh


apt-get install -y iptables-persistent
echo "" > /etc/systemd/system/iptables.service

echo "[Unit]" >> /etc/systemd/system/iptables.service
echo "Description=Firewall Rules to iptables" >> /etc/systemd/system/iptables.service

echo "[Service]" >> /etc/systemd/system/iptables.service
echo "Type=oneshot" >> /etc/systemd/system/iptables.service
echo "ExecStart=/usr/local/src/firewall-iptables.sh" >> /etc/systemd/system/iptables.service

echo "[Install]" >> /etc/systemd/system/iptables.service
echo "WantedBy=multi-user.target" >> /etc/systemd/system/iptables.service

chmod 755 /etc/systemd/system/iptables.service


## to save to file
# #iptables-save   > /etc/iptables.up.rules

echo "#!/bin/sh" > /usr/local/src/firewall-iptables.sh
echo "iptables-restore  < /etc/iptables.up.rules" >> /usr/local/src/firewall-iptables.sh
echo "exit 0" >> /usr/local/src/firewall-iptables.sh
chmod 755 /usr/local/src/firewall-iptables.sh

systemctl enable iptables

