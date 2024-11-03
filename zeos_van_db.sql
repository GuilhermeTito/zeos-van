/* MySQL */

create database zeos_van_db;

use zeos_van_db;

create table passageiro(
	id int NOT NULL AUTO_INCREMENT,
    nome varchar(80) NOT NULL,
    email varchar(80) NOT NULL UNIQUE,
    telefone varchar (14),
    senha varchar(100) NOT NULL,
    data_cadastro date,
    ponto_partida_padrao VARCHAR(300),
    latitude_partida_padrao DOUBLE,
    longitude_partida_padrao DOUBLE,
	horario_partida_padrao TIME,
	ponto_chegada_padrao VARCHAR(300),
    latitude_chegada_padrao DOUBLE,
    longitude_chegada_padrao DOUBLE,
	horario_chegada_padrao TIME,
    CONSTRAINT pk_passageiro PRIMARY KEY (id)
);

create table motorista(
	id int NOT NULL AUTO_INCREMENT,
    nome varchar(80) NOT NULL,
    email varchar(80)  NOT NULL UNIQUE,
    telefone varchar (14),
    senha varchar(100) NOT NULL,
    data_cadastro date,
    CONSTRAINT pk_motorista PRIMARY KEY (id)
);

CREATE TABLE viagem_marcada (
	id INT NOT NULL AUTO_INCREMENT,
	id_passageiro INT NOT NULL,
	data_viagem DATE NOT NULL,
	ponto_partida VARCHAR(300) NOT NULL,
    latitude_partida DOUBLE NOT NULL,
    longitude_partida DOUBLE NOT NULL,
	horario_partida TIME NOT NULL,
	ponto_chegada VARCHAR(300) NOT NULL,
    latitude_chegada DOUBLE NOT NULL,
    longitude_chegada DOUBLE NOT NULL,
	horario_chegada TIME NOT NULL,
	CONSTRAINT pk_viagem_marcada PRIMARY KEY (id),
    INDEX fk_viagem_marcada_passageiro_idx (id_passageiro ASC) VISIBLE,
	CONSTRAINT fk_viagem_marcada_passageiro
	FOREIGN KEY (id_passageiro)
	REFERENCES passageiro (id)
	ON DELETE CASCADE
	ON UPDATE NO ACTION
);

CREATE TABLE turma (
	id INT NOT NULL AUTO_INCREMENT,
	id_motorista INT NOT NULL,
    nome VARCHAR(50) NOT NULL,
	CONSTRAINT pk_turma PRIMARY KEY (id),
	INDEX fk_turma_motorista_idx (id_motorista ASC) VISIBLE,
	CONSTRAINT fk_turma_motorista
	FOREIGN KEY (id_motorista)
	REFERENCES motorista (id)
	ON DELETE CASCADE
	ON UPDATE NO ACTION
);

CREATE TABLE passageiro_turma (
	id_passageiro INT NOT NULL,
	id_turma INT NOT NULL,
	CONSTRAINT pk_passageiro_turma PRIMARY KEY (id_passageiro, id_turma),
	INDEX fk_passageiro_turma_turma_idx (id_turma ASC) VISIBLE,
	CONSTRAINT fk_passageiro_turma_passageiro
	FOREIGN KEY (id_passageiro)
	REFERENCES passageiro (id)
	ON DELETE NO ACTION
	ON UPDATE NO ACTION,
	CONSTRAINT fk_passageiro_turma_turma
	FOREIGN KEY (id_turma)
	REFERENCES turma (id)
	ON DELETE CASCADE
	ON UPDATE NO ACTION
);