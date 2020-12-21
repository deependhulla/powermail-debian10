<?php


$name = GO::t("Holidays", "leavedays");


// add default credit types
$sql = "INSERT INTO `ld_credit_types` (`id`, `name`, `description`, `credit_doesnt_expired`, `sort_index`) VALUES (1, '". $name ."', '". $name ."', '1', '1');";
echo $sql."\n";

\GO::getDbConnection()->query($sql);







