<?php

echo "Converting ticket agent permissions\n";

//require_once('../../../../GO.php');
//
//\GO::$ignoreAclPermissions=true;



$users = \GO::modules()->tickets->acl->getUsers()->fetchAll();
$groups= \GO::modules()->tickets->acl->getGroups()->fetchAll();


$stmt = \GO\Tickets\Model\Type::model()->find();
while($type = $stmt->fetch()){
	
	echo "Type $type->name\n";
	//not using constants here because they change later
	foreach($users as $user){
		if($user->permission_level>1 && $type->acl->hasUser($user->id))
			$type->acl->addUser($user->id, 4);		
	}
	
	foreach($groups as $group){
		if($group->permission_level>1 && $type->acl->hasGroup($group->id))
			$type->acl->addGroup($group->id, 4);		
	}
}

foreach($users as $user){
	if($user->id!=1 && $user->permission_level>1)
		\GO::modules()->tickets->acl->addUser($user->id, 1);		
}

foreach($groups as $group){
	if($group->id!=1&&$group->permission_level>1)
		\GO::modules()->tickets->acl->addGroup($group->id, 1);		
}

echo "Done\n\n";
