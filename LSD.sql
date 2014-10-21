CREATE TABLE players(
	id SERIAL PRIMARY KEY,
	name TEXT NOT NULL,
);

CREATE TABLE teams(
	id SERIAL PRIMARY KEY,
	name TEXT NOT NULL,
	symbol TEXT,
	user_id INTEGER REFERENCES users(id)
);

CREATE TABLE player_team(
	player_id INTEGER REFERENCES players(id),
	team_id INTEGER REFERENCES teams(id)
);

CREATE TABLE player_about(
	player_id INTEGER REFERENCES players(id),
	name TEXT NOT NULL,
	val TEXT NOT NULL
);

CREATE TABLE users{
	id SERIAL PRIMARY KEY,
	email TEXT UNIQUE NOT NULL,
	password TEXT NOT NULL,
	name TEXT NOT NULL,
	birthday DATE
};

CREATE TABLE team_staff(
	team_id INTEGER REFERENCES teams(id),
	staff_id INTEGER REFERENCES users(id)
);

