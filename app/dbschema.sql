CREATE SCHEMA `wt_teams_sp23` ;

drop table if exists license_levels;
create table license_levels (
	id int not null auto_increment,
	value varchar(32) default null,
	description varchar(2048) not null,
	primary key (id)
) engine=InnoDB auto_increment=6 default charset=latin1;

lock tables license_levels write;
insert into license_levels values 
	(1, 'NA', 'Not Applicable'), 
	(2, 'A', 'A Level License'),
	(3, 'B', 'B Level License'),
	(4, 'C', 'C Level License'),
	(5, 'D', 'D Level License');
unlock tables;

drop table if exists leagues;
create table leagues (
	id int not null auto_increment,
	name varchar(32) default null,
	description varchar(2048) not null,
	primary key (id)
) engine=InnoDB auto_increment=3 default charset=latin1;

lock tables leagues write;
insert into leagues values (1, 'NBL', 'National Biñho League'), (2, 'MLB', 'Minor League Biñho');
unlock tables;

drop table if exists people;
create table people (
	id int not null auto_increment,
	first_name varchar(32) default null,
	last_name varchar(32) not null,
	address1 varchar(128) not null,
	address2 varchar(128) default null,
	notes varchar(2048) not null,
	city varchar(64) default null,
	state varchar(2) default null,
	zip varchar(10) default null,
	team_id int not null,
	email varchar(128) not null,
	phone varchar(24) not null,
	password varchar(32) not null,
	user_name varchar(32) not null,
	license_level_id int not null,
	person_type enum ('coach', 'player', 'admin') not null,
	primary key (id),
	key fk_team (team_id)
) engine=InnoDB auto_increment=6 default charset=latin1;

lock tables people write;
insert into people values
(1, 'William', 'Thackeray', '422 W Ida Circle', null, 'notes', 'American Fork', 'UT', '84003', 3, 'will_thack@comcast.net', '801-641-4181', 'password', 'wthack', 1, 'coach'),
(2, 'Noah', 'Thackeray', '1300 E 700 N', null, 'notes', 'Salt Lake City', 'UT', '84115', 1, 'noah_thack@gmail.com', '801-555-1524', 'password', 'nthack', 3, 'coach'),
(3, 'Andrew', 'Thackeray', '3398 Highland Drive', null, 'notes', 'Salt Lake City', 'UT', '84106', 2, 'andy_thack@yahoo.com', '801-555-9834', 'password', 'athack', 2, 'player'),
(4, 'Eric', 'Thackeray', '6286 Dellron Dr', null, 'notes', 'Murray', 'UT', '84123', 1, 'erick_thack@gmail.com', '801-555-6639', 'password', 'ethack', 2, 'player');
unlock tables;

drop table if exists teams;
create table teams (
	id int not null auto_increment,
	name varchar(128) default null,
	coach_id int not null,
	league_id int not null,
	notes varchar(1024) not null,
	motto varchar(1024) not null,
	primary key (id),
	key coach_id_2 (coach_id)
	key league_id (league_id)
	constraint fk_coach_person foreign key (coach_id) references people (id),
	constraint fk_league_team foreign key (league_id) references leagues (id)
) engine=InnoDB auto_increment=4 default charset=latin1;

lock tables teams write;
insert into teams 
(id, name, coach_id, league_id, notes, motto)
values
(4, 'Indexers', 4, 2, 'erics team', 'Click, not kick'),
(2, 'Phalange Kickers', 3, 1, 'andys team', 'Never back down'),
(3, 'Sausage Links', 1, 2, 'wills team', 'Stay thick'),
(1, 'Ten Little Piggies', 2, 1, 'noahs team', 'We always take it all the way home');
unlock tables;
