
DROP TABLE IF EXISTS `qq_link`;

CREATE TABLE `qq_link` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `qq` varchar(255) DEFAULT NULL,
  `playerUuid` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `regDate` datetime DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `qq_link` WRITE;
