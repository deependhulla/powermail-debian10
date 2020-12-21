<?php


$readlist="/tmp/tmp-restore-list.txt";

## restore in folder (latter rsync or scp to users folder )
$restore_in_folder="/mailarchivedata/data-restored";

## make runcmd to 0 for dry run  only rpint else 1 will run the cmd
$runcmd=1;

###################################
###################################
$fd=file_get_contents($readlist);
$fdx=array();
$fdx=explode("\n",$fd);
$e=0;
$f=sizeof($fdx) ;
for($i=0;$i<sizeof($fdx);$i++){if($fdx[$i] !=""){$e++;$f=$e;}}

$e=0;
for($i=0;$i<sizeof($fdx);$i++)
{
if($fdx[$i] !=""){
$e++;
print "\n Restoring $e of $f --> ".$fdx[$i];
$cmdx=" /bin/cp -pRv \"".$fdx[$i]."\" ".$restore_in_folder."/";
#print "\n $cmdx";
if($runcmd==1){ $cmdout=`$cmdx`;}
}
}


$cmdx="gzip -dv ".$restore_in_folder."/*.gz ";
print "\n All compress file copied , now transfer this to mail-server ";
print "\n You can than uncompress all using $cmdx";
#print "\n $cmdx";
#if($runcmd==1){ $cmdout=`$cmdx`;}

print "\n";
?>
