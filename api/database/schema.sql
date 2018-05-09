-- Create syntax for TABLE 'users'
CREATE TABLE `users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL DEFAULT '',
	`faceid` text,
  `password` varchar(40) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE `statistics` (
	`id` int not null primary key auto_increment,
	`water` int not null,
	`energy` int not null,
	`month` int not null,
	`year` int not null
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
