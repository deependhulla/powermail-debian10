CREATE TABLE IF NOT EXISTS `{tableName}` (`id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,{aclFld} `filesFolderId` int(11) DEFAULT NULL, `createdBy` INT(11) NOT NULL,`createdAt` DATETIME NOT NULL, `modifiedBy`  int(11) NOT NULL, `modifiedAt` DATETIME DEFAULT NULL) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

{aclKey}

CREATE TABLE IF NOT EXISTS `{tableName}_custom_fields` (`id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, CONSTRAINT `{tableName}_custom_fields_ibfk_1` FOREIGN KEY(id) REFERENCES {tableName} (id) ON DELETE CASCADE ON UPDATE RESTRICT) ENGINE = Innodb DEFAULT CHARSET = utf8mb4 COLlATE = utf8mb4_unicode_ci;