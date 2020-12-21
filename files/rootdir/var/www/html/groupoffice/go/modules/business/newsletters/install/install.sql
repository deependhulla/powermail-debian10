DROP TABLE IF EXISTS `newsletters_address_list`;
CREATE TABLE `newsletters_address_list` (
  `id` int(11) NOT NULL,
  `entityTypeId` int(11) NOT NULL,
  `aclId` int(11) NOT NULL,
  `name` varchar(190) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `newsletters_address_list_entity`;
CREATE TABLE `newsletters_address_list_entity` (
  `addressListId` int(11) NOT NULL,
  `entityId` int(11) NOT NULL,
  `token` binary(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `newsletters_newsletter`;
CREATE TABLE `newsletters_newsletter` (
  `id` int(11) NOT NULL,
  `addressListId` int(11) NOT NULL,
  `smtpAccountId` int(11) DEFAULT NULL,
  `startedAt` datetime NOT NULL,
  `finishedAt` datetime DEFAULT NULL,
  `lastMessageSentAt` DATETIME NULL DEFAULT NULL,
  `subject` varchar(192) COLLATE utf8mb4_unicode_ci NOT NULL,
  `body` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `paused` tinyint(1) NOT NULL DEFAULT 0,
  `createdBy` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `newsletters_newsletter_attachment`;
CREATE TABLE `newsletters_newsletter_attachment` (
  `id` int(11) NOT NULL,
  `blobId` binary(40) NOT NULL,
  `newsletterId` int(11) NOT NULL,
  `name` varchar(192) COLLATE utf8mb4_unicode_ci NOT NULL,
  `inline` tinyint(1) NOT NULL DEFAULT 0,
  `attachment` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `newsletters_newsletter_entity`;
CREATE TABLE `newsletters_newsletter_entity` (
  `newsletterId` int(11) NOT NULL,
  `entityId` int(11) NOT NULL,
  `sent` tinyint(1) NOT NULL DEFAULT 0,
  `error` text COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


ALTER TABLE `newsletters_address_list`
  ADD PRIMARY KEY (`id`),
  ADD KEY `aclId` (`aclId`),
  ADD KEY `entityTypeId` (`entityTypeId`) USING BTREE;

ALTER TABLE `newsletters_address_list_entity`
  ADD PRIMARY KEY (`addressListId`,`entityId`);

ALTER TABLE `newsletters_newsletter`
  ADD PRIMARY KEY (`id`),
  ADD KEY `addressListId` (`addressListId`),
  ADD KEY `newsletters_newsletter_ibfk_2` (`smtpAccountId`),
  ADD KEY `createdBy` (`createdBy`);

ALTER TABLE `newsletters_newsletter_attachment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `blobId` (`blobId`),
  ADD KEY `newsletterId` (`newsletterId`);

ALTER TABLE `newsletters_newsletter_entity`
  ADD PRIMARY KEY (`newsletterId`,`entityId`);


ALTER TABLE `newsletters_address_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `newsletters_newsletter`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `newsletters_newsletter_attachment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;


ALTER TABLE `newsletters_address_list`
  ADD CONSTRAINT `newsletters_address_list_ibfk_1` FOREIGN KEY (`entityTypeId`) REFERENCES `core_entity` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `newsletters_address_list_ibfk_2` FOREIGN KEY (`aclId`) REFERENCES `core_acl` (`id`);

ALTER TABLE `newsletters_address_list_entity`
  ADD CONSTRAINT `newsletters_address_list_entity_ibfk_1` FOREIGN KEY (`addressListId`) REFERENCES `newsletters_address_list` (`id`) ON DELETE CASCADE;

ALTER TABLE `newsletters_newsletter`
  ADD CONSTRAINT `newsletters_newsletter_ibfk_1` FOREIGN KEY (`addressListId`) REFERENCES `newsletters_address_list` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `newsletters_newsletter_ibfk_2` FOREIGN KEY (`smtpAccountId`) REFERENCES `core_smtp_account` (`id`) ON UPDATE SET NULL,
  ADD CONSTRAINT `newsletters_newsletter_ibfk_3` FOREIGN KEY (`createdBy`) REFERENCES `core_user` (`id`) ON DELETE SET NULL;

ALTER TABLE `newsletters_newsletter_attachment`
  ADD CONSTRAINT `newsletters_newsletter_attachment_ibfk_1` FOREIGN KEY (`blobId`) REFERENCES `core_blob` (`id`),
  ADD CONSTRAINT `newsletters_newsletter_attachment_ibfk_2` FOREIGN KEY (`newsletterId`) REFERENCES `newsletters_newsletter` (`id`) ON DELETE CASCADE;

ALTER TABLE `newsletters_newsletter_entity`
  ADD CONSTRAINT `newsletters_newsletter_entity_ibfk_1` FOREIGN KEY (`newsletterId`) REFERENCES `newsletters_newsletter` (`id`) ON DELETE CASCADE;
