DROP DATABASE IF EXISTS MANGA_LAB;
CREATE DATABASE MANGA_LAB;

use MANGA_LAB;


CREATE TABLE IF NOT EXISTS login(
id_login int auto_increment,
nome_utilizador varchar(100) not null,
pass_word varchar(100) not null,
primary key (id_login)
);

CREATE TABLE IF NOT EXISTS administrador(
id_admin int auto_increment,
personal_question varchar(100) not null,
id_login int not null,
primary key (id_admin),
foreign key (id_login) references login(id_login)
);

CREATE TABLE IF NOT EXISTS lab(
id_lab int auto_increment not null,
nome varchar(100) not null,
primary key (id_lab)
);

CREATE TABLE IF NOT EXISTS recipiente(
id_recipiente int auto_increment not null,
nome varchar(100) not null,
mac_address varchar(17) not null,
motor_state bool not null default false,
peltier_state bool not null default false,
total_volume double not null,
id_lab int not null default 1,
primary key (id_recipiente),
foreign key (id_lab) references lab(id_lab)
);

CREATE TABLE IF NOT EXISTS temp(
id_sensor_temp int auto_increment,
valor double not null,
id_recipiente int not null,
time_logged datetime not null default now(),
primary key (id_sensor_temp),
foreign key (id_recipiente) references recipiente(id_recipiente)
);

CREATE TABLE IF NOT EXISTS volume(
id_volume int auto_increment,
valor double not null,
id_recipiente int not null,
time_logged datetime not null default now(),
primary key (id_volume),
foreign key (id_recipiente) references recipiente(id_recipiente)
);

CREATE TABLE IF NOT EXISTS utilizador(
id_utilizador int auto_increment,
nome varchar(100) not null,
apelido varchar(100) not null,
email varchar(100) not null,
img varchar(1000) not null default '',
id_lab int not null default 1,
primary key(id_utilizador),
foreign key (id_lab) references lab(id_lab)
);

CREATE TABLE IF NOT EXISTS login_utilizador(
id_utilizador int not null,
id_login int not null,
foreign key (id_login) references login(id_login),
foreign key (id_utilizador) references utilizador(id_utilizador)
);

insert into lab(nome) values("Lab0");

#####################################################

select * from (select * from temp where id_recipiente = 1 order by temp.time_logged desc limit 10) order by time_logged asc;

INSERT INTO `manga_lab`.`temp` (`id_sensor_temp`, `valor`, `id_recipiente`, `time_logged`) VALUES ('3', '26', '1', '2024-02-04 17:43:59');
INSERT INTO `manga_lab`.`volume` (`id_volume`, `valor`, `id_recipiente`, `time_logged`) VALUES ('1', '0.22', '1', '2024-02-04');

select * from temp;
select * from recipiente;
select * from temp where id_recipiente = 1 order by temp.time_logged desc limit 1;
select * from volume where id_recipiente = 1 order by time_logged desc limit 1;

ALTER USER 'manga'@'localhost' IDENTIFIED WITH mysql_native_password BY 'pwdam';
flush privileges;

select * from utilizador;
select * from login_utilizador;
select * from recipiente;

select login_utilizador.id_utilizador, utilizador.nome, utilizador.apelido, utilizador.email from login_utilizador inner join utilizador on login_utilizador.id_utilizador = utilizador.id_utilizador where id_login = 1;

select login.nome_utilizador as username, utilizador.nome as firstname, utilizador.apelido as lastname, utilizador.email, lab.nome as lab from utilizador inner join lab on utilizador.id_lab = lab.id_lab inner join login_utilizador on utilizador.id_utilizador = login_utilizador.id_utilizador inner join login on login.id_login = login_utilizador.id_login where utilizador.id_utilizador = 1;

select login.nome_utilizador, utilizador.img, utilizador.nome as firstname, utilizador.apelido as lastname, utilizador.email, lab.nome as lab from utilizador inner join login_utilizador on utilizador.id_utilizador = login_utilizador.id_utilizador inner join login on login.id_login = login_utilizador.id_login inner join lab on utilizador.id_lab = lab.id_lab where utilizador.id_lab = 1;