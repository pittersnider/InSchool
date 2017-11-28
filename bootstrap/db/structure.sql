CREATE TABLE IF NOT EXISTS `user` (
      `id` INT(12) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      `passport` VARCHAR(40) NOT NULL,
      `joined` TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,
      `name` VARCHAR(50) NOT NULL,
      `email` VARCHAR(50) NOT NULL,
      `role` SMALLINT(3) UNSIGNED NOT NULL,
      `status` SMALLINT(3) UNSIGNED NOT NULL,
      `createdAt` DATETIME NOT NULL DEFAULT NOW(),
      `updatedAt` DATETIME NULL DEFAULT NULL ON UPDATE NOW(),
      INDEX `u_invite` (`joined`),
      INDEX `u_role` (`role`),
      INDEX `u_status` (`status`),
      INDEX `u_name` (`name`),
      UNIQUE INDEX `u_email` (`email`),
      UNIQUE INDEX `u_passport` (`passport`),
      INDEX `_created` (`createdAt`),
      INDEX `_updated` (`updatedAt`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `classroom` (
      `id` INT(12) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      `status` SMALLINT(3) UNSIGNED NOT NULL,
      `name` VARCHAR(50) NOT NULL,
      `year` INT(4) UNSIGNED NOT NULL,
      `periods` JSON NOT NULL,
      `createdAt` DATETIME NOT NULL DEFAULT NOW(),
      `updatedAt` DATETIME NULL DEFAULT NULL ON UPDATE NOW(),
      `closedAt` DATETIME NULL DEFAULT NULL,
      INDEX `c_status` (`status`),
      UNIQUE INDEX `c_year` (`year`,`name`),
      INDEX `_created` (`createdAt`),
      INDEX `_updated` (`updatedAt`),
      INDEX `_closed` (`closedAt`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `user_classroom` (
      `id` INT(12) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      `user_id` INT(12) UNSIGNED NOT NULL,
      `classroom_id` INT(12) UNSIGNED NOT NULL,
      `status` SMALLINT(3) UNSIGNED NOT NULL,
      `createdAt` DATETIME NOT NULL DEFAULT NOW(),
      `updatedAt` DATETIME NULL DEFAULT NULL ON UPDATE NOW(),
      INDEX `uc_status` (`status`),
      INDEX `_created` (`createdAt`),
      INDEX `_updated` (`updatedAt`),
      CONSTRAINT `pk_uc_user_id` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE,
      CONSTRAINT `pk_uc_classroom_id` FOREIGN KEY (`classroom_id`) REFERENCES `classroom`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `exam` (
      `id` INT(12) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      `teacher_id` INT(12) UNSIGNED NOT NULL,
      `status` SMALLINT(3) UNSIGNED NOT NULL,
      `quarter` SMALLINT(1) UNSIGNED NOT NULL,
      `worth` DOUBLE PRECISION UNSIGNED NOT NULL,
      `subject` VARCHAR(50) NOT NULL,
      `name` VARCHAR(50) NOT NULL,
      `createdAt` DATETIME NOT NULL DEFAULT NOW(),
      `updatedAt` DATETIME NULL DEFAULT NULL ON UPDATE NOW(),
      INDEX `ex_status` (`status`),
      INDEX `ex_quarter` (`quarter`),
      INDEX `ex_worth` (`worth`),
      INDEX `_created` (`createdAt`),
      INDEX `_updated` (`updatedAt`),
      CONSTRAINT `pk_ex_teacher_id` FOREIGN KEY (`teacher_id`) REFERENCES `user`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `knowledge` (
      `id` INT(12) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      `author_id` INT(12) UNSIGNED NOT NULL,
      `status` SMALLINT(3) UNSIGNED NOT NULL,
      `subject` VARCHAR(50) NOT NULL,
      `name` VARCHAR(50) NOT NULL,
      `content` JSON NOT NULL,
      `tags` JSON NOT NULL,
      `createdAt` DATETIME NOT NULL DEFAULT NOW(),
      `updatedAt` DATETIME NULL DEFAULT NULL ON UPDATE NOW(),
      INDEX `kw_status` (`status`),
      INDEX `kw_name` (`name`),
      INDEX `kw_subject` (`subject`),
      INDEX `_created` (`createdAt`),
      INDEX `_updated` (`updatedAt`),
      CONSTRAINT `pk_kw_author_id` FOREIGN KEY (`author_id`) REFERENCES `user`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `exam_knowledge` (
      `id` INT(12) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      `author_id` INT(12) UNSIGNED NOT NULL,
      `exam_id` INT(12) UNSIGNED NOT NULL,
      `knowledge_id` INT(12) UNSIGNED NOT NULL,
      `createdAt` DATETIME NOT NULL DEFAULT NOW(),
      `updatedAt` DATETIME NULL DEFAULT NULL ON UPDATE NOW(),
      INDEX `_created` (`createdAt`),
      INDEX `_updated` (`updatedAt`),
      CONSTRAINT `pk_ek_author_id` FOREIGN KEY (`author_id`) REFERENCES `user`(`id`) ON DELETE CASCADE,
      CONSTRAINT `pk_ek_exam_id` FOREIGN KEY (`exam_id`) REFERENCES `exam`(`id`) ON DELETE CASCADE,
      CONSTRAINT `pk_ek_knowledge_id` FOREIGN KEY (`knowledge_id`) REFERENCES `knowledge`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `user_exam` (
      `id` INT(12) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      `exam_id` INT(12) UNSIGNED NOT NULL,
      `user_id` INT(12) UNSIGNED NOT NULL,
      `classroom_id` INT(12) UNSIGNED NOT NULL,
      `outperform` DOUBLE PRECISION UNSIGNED NOT NULL,
      `createdAt` DATETIME NOT NULL DEFAULT NOW(),
      `updatedAt` DATETIME NULL DEFAULT NULL ON UPDATE NOW(),
      INDEX `_created` (`createdAt`),
      INDEX `_updated` (`updatedAt`),
      INDEX `uex_outperform` (`outperform`),
      CONSTRAINT `pk_uex_user_id` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE,
      CONSTRAINT `pk_uex_exam_id` FOREIGN KEY (`exam_id`) REFERENCES `exam`(`id`) ON DELETE CASCADE,
      CONSTRAINT `pk_uex_classroom_id` FOREIGN KEY (`classroom_id`) REFERENCES `classroom`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `classroom_exam` (
      `id` INT(12) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      `exam_id` INT(12) UNSIGNED NOT NULL,
      `classroom_id` INT(12) UNSIGNED NOT NULL,
      `status` SMALLINT(3) UNSIGNED NOT NULL,
      `scheduledTo` DATETIME NOT NULL,
      `createdAt` DATETIME NOT NULL DEFAULT NOW(),
      `updatedAt` DATETIME NULL DEFAULT NULL ON UPDATE NOW(),
      INDEX `_created` (`createdAt`),
      INDEX `_updated` (`updatedAt`),
      INDEX `cex_scheduledTo` (`scheduledTo` ASC),
      INDEX `cex_status` (`status`),
      CONSTRAINT `pk_cex_exam_id` FOREIGN KEY (`exam_id`) REFERENCES `exam`(`id`) ON DELETE CASCADE,
      CONSTRAINT `pk_cex_classroom_id` FOREIGN KEY (`classroom_id`) REFERENCES `classroom`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `user_report` (
      `id` INT(12) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      `user_id` INT(12) UNSIGNED NOT NULL,
      `quarter` SMALLINT(1) UNSIGNED NOT NULL,
      `year` INT(4) UNSIGNED NOT NULL,
      `detail` JSON NOT NULL,
      `createdAt` DATETIME NOT NULL DEFAULT NOW(),
      `updatedAt` DATETIME NULL DEFAULT NULL ON UPDATE NOW(),
      INDEX `_created` (`createdAt`),
      INDEX `_updated` (`updatedAt`),
      UNIQUE INDEX (`user_id`, `quarter`, `year`),
      CONSTRAINT `pk_ur_user_id` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `contact` (
      `id` INT(12) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      `author_id` INT(12) UNSIGNED NOT NULL,
      `responsible_id` INT(12) UNSIGNED NULL,
      `status` SMALLINT(3) UNSIGNED NOT NULL,
      `subject` VARCHAR(50) NOT NULL,
      `name` VARCHAR(50) NOT NULL,
      `createdAt` DATETIME NOT NULL DEFAULT NOW(),
      `updatedAt` DATETIME NULL DEFAULT NULL ON UPDATE NOW(),
      INDEX `ct_status` (`status`),
      INDEX `ct_subject` (`subject`),
      INDEX `ct_name` (`name`),
      INDEX `_created` (`createdAt`),
      INDEX `_updated` (`updatedAt`),
      CONSTRAINT `pk_ct_author_id` FOREIGN KEY (`author_id`) REFERENCES `user`(`id`) ON DELETE CASCADE,
      CONSTRAINT `pk_ct_responsible_id` FOREIGN KEY (`responsible_id`) REFERENCES `user`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `contact_answer` (
      `id` INT(12) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      `sender_id` INT(12) UNSIGNED NOT NULL,
      `contact_id` INT(12) UNSIGNED NOT NULL,
      `status` SMALLINT(3) UNSIGNED NOT NULL,
      `content` JSON NOT NULL,
      `fromAuthor` TINYINT(1) UNSIGNED NOT NULL,
      `createdAt` DATETIME NOT NULL DEFAULT NOW(),
      `updatedAt` DATETIME NULL DEFAULT NULL ON UPDATE NOW(),
      INDEX `cta_status` (`status`),
      INDEX `cta_fromAuthor` (`fromAuthor`),
      INDEX `_created` (`createdAt`),
      INDEX `_updated` (`updatedAt`),
      CONSTRAINT `pk_cta_sender_id` FOREIGN KEY (`sender_id`) REFERENCES `user`(`id`) ON DELETE CASCADE,
      CONSTRAINT `pk_cta_contact_id` FOREIGN KEY (`contact_id`) REFERENCES `contact`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `subscription` (
      `id` INT(12) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      `author_id` INT(12) UNSIGNED NOT NULL,
      `status` SMALLINT(3) UNSIGNED NOT NULL,
      `type` SMALLINT(3) UNSIGNED NOT NULL,
      `name` VARCHAR(50) NOT NULL,
      `detail` JSON NOT NULL,
      `createdAt` DATETIME NOT NULL DEFAULT NOW(),
      `updatedAt` DATETIME NULL DEFAULT NULL ON UPDATE NOW(),
      INDEX `sb_status` (`status`),
      INDEX `sb_type` (`type`),
      INDEX `sb_name` (`name`),
      INDEX `_created` (`createdAt`),
      INDEX `_updated` (`updatedAt`),
      CONSTRAINT `pk_sb_author_id` FOREIGN KEY (`author_id`) REFERENCES `user`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `subscription_request` (
      `id` INT(12) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      `sender_id` INT(12) UNSIGNED NOT NULL,
      `subscription_id` INT(12) UNSIGNED NOT NULL,
      `status` SMALLINT(3) UNSIGNED NOT NULL,
      `detail` JSON NOT NULL,
      `attachment` JSON NOT NULL,
      `createdAt` DATETIME NOT NULL DEFAULT NOW(),
      `updatedAt` DATETIME NULL DEFAULT NULL ON UPDATE NOW(),
      INDEX `sbr_status` (`status`),
      INDEX `_created` (`createdAt`),
      INDEX `_updated` (`updatedAt`),
      CONSTRAINT `pk_sbr_sender_id` FOREIGN KEY (`sender_id`) REFERENCES `user`(`id`) ON DELETE CASCADE,
      CONSTRAINT `pk_sbr_subscription_id` FOREIGN KEY (`subscription_id`) REFERENCES `subscription`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `dictionary` (
      `id` INT(12) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      `code` CHAR(2) NOT NULL,
      `name` VARCHAR(50) NOT NULL,
      `version` VARCHAR(10) NOT NULL,
      `words` JSON NOT NULL,
      `createdAt` DATETIME NOT NULL DEFAULT NOW(),
      `updatedAt` DATETIME NULL DEFAULT NULL ON UPDATE NOW(),
      UNIQUE INDEX `dc_info` (`code`,`version`),
      INDEX `dc_name` (`name`),
      INDEX `_created` (`createdAt`),
      INDEX `_updated` (`updatedAt`)
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `menu` (
      `id` INT(12) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      `shift` SMALLINT(1) UNSIGNED NOT NULL,
      `weekday` SMALLINT(2) UNSIGNED NOT NULL,
      `name` VARCHAR(50) NOT NULL,
      `createdAt` DATETIME NOT NULL DEFAULT NOW(),
      `updatedAt` DATETIME NULL DEFAULT NULL ON UPDATE NOW(),
      UNIQUE INDEX `mn_datetime` (`shift`, `weekday`),
      INDEX `_created` (`createdAt`),
      INDEX `_updated` (`updatedAt`)
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `log` (
      `id` INT(12) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      `priority` SMALLINT(1) UNSIGNED NOT NULL DEFAULT 0,
      `type` SMALLINT(3) UNSIGNED NOT NULL DEFAULT 0,
      `status` SMALLINT(3) UNSIGNED NOT NULL,
      `detail` JSON NOT NULL,
      `createdAt` DATETIME NOT NULL DEFAULT NOW(),
      INDEX `log_priority` (`priority`),
      INDEX `log_type` (`type`),
      INDEX `log_status` (`status`),
      INDEX `_created` (`createdAt`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;