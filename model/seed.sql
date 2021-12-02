CREATE DATABASE IF NOT EXISTS capstone_todolist;
USE capstone_todolist;

CREATE TABLE IF NOT EXISTS `items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` text,
  `complete` boolean,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
