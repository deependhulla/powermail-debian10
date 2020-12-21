#!/bin/sh

echo "" > /tmp/tmp-restore-list.txt

php search-and-build-list.php sampleuser@example.com 2018-01 >> /tmp/tmp-restore-list.txt
php search-and-build-list.php sampleuser@example.com 2018-02 >> /tmp/tmp-restore-list.txt
php search-and-build-list.php sampleuser@example.com 2018-03 >> /tmp/tmp-restore-list.txt
php search-and-build-list.php sampleuser@example.com 2018-04 >> /tmp/tmp-restore-list.txt
php search-and-build-list.php sampleuser@example.com 2018-05 >> /tmp/tmp-restore-list.txt
php search-and-build-list.php sampleuser@example.com 2018-06 >> /tmp/tmp-restore-list.txt
php search-and-build-list.php sampleuser@example.com 2018-07 >> /tmp/tmp-restore-list.txt
php search-and-build-list.php sampleuser@example.com 2018-08 >> /tmp/tmp-restore-list.txt
php search-and-build-list.php sampleuser@example.com 2018-09 >> /tmp/tmp-restore-list.txt
php search-and-build-list.php sampleuser@example.com 2018-10 >> /tmp/tmp-restore-list.txt
php search-and-build-list.php sampleuser@example.com 2018-11 >> /tmp/tmp-restore-list.txt
php search-and-build-list.php sampleuser@example.com 2018-12 >> /tmp/tmp-restore-list.txt


php search-and-build-list.php sampleuser@example.com 2019-01 >> /tmp/tmp-restore-list.txt
php search-and-build-list.php sampleuser@example.com 2019-02 >> /tmp/tmp-restore-list.txt
php search-and-build-list.php sampleuser@example.com 2019-03 >> /tmp/tmp-restore-list.txt
php search-and-build-list.php sampleuser@example.com 2019-04 >> /tmp/tmp-restore-list.txt
php search-and-build-list.php sampleuser@example.com 2019-05 >> /tmp/tmp-restore-list.txt
php search-and-build-list.php sampleuser@example.com 2019-06 >> /tmp/tmp-restore-list.txt
php search-and-build-list.php sampleuser@example.com 2019-07 >> /tmp/tmp-restore-list.txt
php search-and-build-list.php sampleuser@example.com 2019-08 >> /tmp/tmp-restore-list.txt
php search-and-build-list.php sampleuser@example.com 2019-09 >> /tmp/tmp-restore-list.txt
php search-and-build-list.php sampleuser@example.com 2019-10 >> /tmp/tmp-restore-list.txt
php search-and-build-list.php sampleuser@example.com 2019-11 >> /tmp/tmp-restore-list.txt

echo "Total List";
cat /tmp/tmp-restore-list.txt | wc -l
echo "";
