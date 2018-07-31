CREATE DATABASE project_hockey;
USE project_hockey;

CREATE TABLE player_info
(
	id int primary key auto_increment,
	player_name varchar(255) NOT NULL,
	cap int,
	goals int,
    assists int,
    total_points int
);