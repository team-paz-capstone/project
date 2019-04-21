/* Create tables based on initial schema. */

/**************************************************/
/**************************************************/

DROP SCHEMA IF EXISTS `team-paz-demo`;

CREATE SCHEMA `team-paz-demo`;

use `team-paz-demo`;

SET FOREIGN_KEY_CHECKS = 0;

/* User table */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `first_name` varchar(45) NOT NULL,
    `last_name` varchar(45) NOT NULL,
    `email` varchar(45) NOT NULL,
    /* TODO - size of this field will depend on the hashing algorithm we use. */
    `password` varchar(45) NOT NULL,
    `signature` longblob,

    PRIMARY KEY(`id`),
    UNIQUE KEY `EMAIL_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=1;

/* Award Type */

DROP TABLE IF EXISTS `award_type`;

CREATE TABLE `award_type` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(45) NOT NULL,
    
    PRIMARY KEY(`id`),

    UNIQUE KEY `NAME_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=1;


/* Award */

DROP TABLE IF EXISTS `award`;

CREATE TABLE `award` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `recipient_id` int(11) NOT NULL,
    `granter_id` int(11) NOT NULL,
    `award_type_id` int(11) NOT NULL,
    `awarded_dt` datetime NOT NULL,

    PRIMARY KEY (`id`),

    KEY `FK_RECIPIENT_idx` (`recipient_id`),
    KEY `FK_GRANTER_idx` (`granter_id`),
    KEY `FK_AWARD_TYPE_idx` (`award_type_id`),

    CONSTRAINT `FK_RECIPIENT`
    FOREIGN KEY (`recipient_id`)
    REFERENCES `user` (`id`),

    CONSTRAINT `FK_GRANTER`
    FOREIGN KEY (`granter_id`)
    REFERENCES `user` (`id`)

    /* TODO - figure out what kind of cascading we want, eg.
     ON DELETE NO ACTION ON UPDATE NO ACTION */

) ENGINE=InnoDB AUTO_INCREMENT=1;



SET FOREIGN_KEY_CHECKS = 1;