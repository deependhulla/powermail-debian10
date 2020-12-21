#!/bin/sh

BASEDIR=$(dirname $0)
echo $BASEDIR
cd $BASEDIR
if [ -f '/tmp/read-group-mail-list.pid' ];
then
   echo "File /tmp/read-group-mail-list.pid exists"
else

touch /tmp/read-group-mail-list.pid

perl process-group-mail-list.pl

/bin/rm -rf /tmp/read-group-mail-list.pid
fi


