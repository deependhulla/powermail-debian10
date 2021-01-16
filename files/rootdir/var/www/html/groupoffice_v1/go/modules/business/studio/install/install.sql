CREATE TABLE IF NOT EXISTS `studio_studio`
(
    `id`          SERIAL PRIMARY KEY,
    `name`        VARCHAR(190) NOT NULL,
    `description` TEXT,
    `moduleId`    int(11)      NOT NULL,
    `locked`      TINYINT(1)   NOT NULL DEFAULT 0,
    `createdBy`   INT(11)      NOT NULL,
    `createdAt`   DATETIME     NOT NULL,
    `modifiedBy`  int(11)      NOT NULL,
    `modifiedAt`  DATETIME              DEFAULT NULL,
    `deletedAt`   DATETIME              DEFAULT NULL,
    CONSTRAINT `studio_studio_core_module_fk1` FOREIGN KEY (`moduleId`) REFERENCES `core_module` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
    CONSTRAINT `studio_studio_core_user_fk1` FOREIGN KEY (`createdBy`) REFERENCES `core_user` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
    CONSTRAINT `studio_studio_core_user_fk2` FOREIGN KEY (`modifiedBy`) REFERENCES `core_user` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;