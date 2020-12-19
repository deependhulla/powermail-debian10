#!bin/sh

/etc/init.d/apache2 stop
certbot certonly -d `hostname -f` --standalone --agree-tos --email postmaster@`hostname -f`

/etc/init.d/apache2 start
