CREATE TABLE player(
	id SERIAL PRIMARY KEY,
	name TEXT NOT NULL,
	doc_ident INTEGER,
	birth DATE,
	contact TEXT,
	email TEXT,
	addres TEXT,
	condition TEXT,
	image TEXT
);

CREATE TABLE club(
	id SERIAL PRIMARY KEY,
	name TEXT,
	symbol TEXT
);

CREATE TABLE team(
	id SERIAL PRIMARY KEY,
	designation TEXT,
	club_id INTEGER REFERENCES club(id)
);

CREATE TABLE player_team(
	player_id INTEGER REFERENCES player(id),
	team_id INTEGER REFERENCES team(id)
);

INSERT INTO player(name, doc_ident, birth, contact,	email, addres, condition, image) 
VALUES('Cristiano Ronaldo',	12532656, '1985-02-05',	'91653552',	'cr7@gmail.com', NULL, 'Em forma', 'http://www.zerozero.pt/img/jogadores/81/210181_cristiano_ronaldo.jpg'
);

INSERT INTO player(name, doc_ident, birth, contact,	email, addres, condition, image) 
VALUES('Lionel Messi',	55562356, '1987-06-24',	'91523684',	'lmessi@gmail.com', NULL, 'Em forma', 'http://www.zerozero.pt/img/jogadores/92/10592_lionel_messi.png'
);

INSERT INTO player(name, doc_ident, birth, contact,	email, addres, condition, image) 
VALUES('Neymar', 65326354, '1992-02-05',	'91865324',	'neymar_jr@gmail.com', NULL, 'Lesionado', 'http://www.zerozero.pt/img/jogadores/14/54814_neymar.png'
);

INSERT INTO player(name, doc_ident, birth, contact,	email, addres, condition, image) 
VALUES('James Rodriguez', 29728942, '1991-07-12',	'96352188',	'james_fcp@gmail.com', NULL, 'Em Forma', 'http://www.zerozero.pt/img/jogadores/24/86924_pri_james_rodriguez.jpg'
);

INSERT INTO club(name, symbol)
VALUES ('Real Madrid', 'http://www.zerozero.pt/img/logos/equipas/50/50_logo_real_madrid.gif');

INSERT INTO club(name, symbol)
VALUES ('Barcelona', 'http://www.zerozero.pt/img/logos/equipas/40/40_logo_barcelona.png');

INSERT INTO team(designation, club_id)
VALUES ('Seniores', 1);

INSERT INTO team(designation, club_id)
VALUES ('Seniores', 2);

INSERT INTO player_team(player_id, team_id)
VALUES(1,1);

INSERT INTO player_team(player_id, team_id)
VALUES(2,2);

INSERT INTO player_team(player_id, team_id)
VALUES(3,2);

INSERT INTO player_team(player_id, team_id)
VALUES(4,1);

