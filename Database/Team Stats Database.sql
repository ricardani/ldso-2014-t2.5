--
-- PostgreSQL database dump
--

-- Dumped from database version 9.1.1
-- Dumped by pg_dump version 9.3.5
-- Started on 2014-10-30 14:38:59

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- TOC entry 190 (class 3079 OID 11638)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 2052 (class 0 OID 0)
-- Dependencies: 190
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_with_oids = false;

--
-- TOC entry 182 (class 1259 OID 28079)
-- Name: attendance; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE attendance (
    id integer NOT NULL,
    id_player integer NOT NULL,
    id_practice integer NOT NULL,
    status boolean DEFAULT false NOT NULL,
    justification character varying
);


--
-- TOC entry 181 (class 1259 OID 28077)
-- Name: attendance_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE attendance_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2053 (class 0 OID 0)
-- Dependencies: 181
-- Name: attendance_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE attendance_id_seq OWNED BY attendance.id;


--
-- TOC entry 166 (class 1259 OID 27944)
-- Name: event; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE event (
    id integer NOT NULL,
    id_login integer NOT NULL,
    description character varying(100),
    date_init date NOT NULL,
    date_end date NOT NULL,
    CONSTRAINT check_dates CHECK ((date_init < date_end))
);


--
-- TOC entry 165 (class 1259 OID 27942)
-- Name: event_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE event_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2054 (class 0 OID 0)
-- Dependencies: 165
-- Name: event_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE event_id_seq OWNED BY event.id;


--
-- TOC entry 179 (class 1259 OID 28054)
-- Name: exercise; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE exercise (
    id integer NOT NULL,
    description character varying(100) NOT NULL,
    duration integer,
    focus character varying(100),
    img character varying(100)
);


--
-- TOC entry 178 (class 1259 OID 28052)
-- Name: exercise_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE exercise_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2055 (class 0 OID 0)
-- Dependencies: 178
-- Name: exercise_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE exercise_id_seq OWNED BY exercise.id;


--
-- TOC entry 184 (class 1259 OID 28101)
-- Name: game; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE game (
    id integer NOT NULL,
    id_team integer NOT NULL,
    date date,
    title character varying(100) NOT NULL
);


--
-- TOC entry 183 (class 1259 OID 28099)
-- Name: game_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE game_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2056 (class 0 OID 0)
-- Dependencies: 183
-- Name: game_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE game_id_seq OWNED BY game.id;


--
-- TOC entry 171 (class 1259 OID 27986)
-- Name: info_block; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE info_block (
    id integer NOT NULL,
    id_player integer NOT NULL,
    title character varying,
    type character varying NOT NULL,
    is_default boolean DEFAULT false NOT NULL,
    CONSTRAINT valid_type CHECK ((((type)::text = 'static'::text) OR ((type)::text = 'dynamic'::text)))
);


--
-- TOC entry 170 (class 1259 OID 27984)
-- Name: info-block_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "info-block_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2057 (class 0 OID 0)
-- Dependencies: 170
-- Name: info-block_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "info-block_id_seq" OWNED BY info_block.id;


--
-- TOC entry 173 (class 1259 OID 28005)
-- Name: info_line; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE info_line (
    id integer NOT NULL,
    id_info_block integer NOT NULL,
    field character varying NOT NULL,
    value character varying,
    date date DEFAULT now() NOT NULL
);


--
-- TOC entry 172 (class 1259 OID 28003)
-- Name: info-line_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "info-line_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2058 (class 0 OID 0)
-- Dependencies: 172
-- Name: info-line_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "info-line_id_seq" OWNED BY info_line.id;


--
-- TOC entry 162 (class 1259 OID 27925)
-- Name: login; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE login (
    id integer NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(65) NOT NULL,
    firstname character varying(50) NOT NULL,
    lastname character varying(50) NOT NULL,
    img character varying(100)
);


--
-- TOC entry 161 (class 1259 OID 27923)
-- Name: login_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE login_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2059 (class 0 OID 0)
-- Dependencies: 161
-- Name: login_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE login_id_seq OWNED BY login.id;


--
-- TOC entry 189 (class 1259 OID 28154)
-- Name: login_team; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE login_team (
    id_login integer NOT NULL,
    id_team integer NOT NULL
);


--
-- TOC entry 168 (class 1259 OID 27952)
-- Name: player; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE player (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    birth_date date,
    phone character varying(20),
    condition character varying DEFAULT 'normal'::character varying NOT NULL,
    img character varying(100),
    CONSTRAINT valid_condition CHECK (((((condition)::text = 'normal'::text) OR ((condition)::text = 'injury'::text)) OR ((condition)::text = 'quit'::text)))
);


--
-- TOC entry 167 (class 1259 OID 27950)
-- Name: player_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE player_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2060 (class 0 OID 0)
-- Dependencies: 167
-- Name: player_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE player_id_seq OWNED BY player.id;


--
-- TOC entry 175 (class 1259 OID 28022)
-- Name: practice; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE practice (
    id integer NOT NULL,
    id_team integer NOT NULL,
    id_workout integer,
    local character varying(150),
    date_init date,
    date_end date,
    CONSTRAINT check_dates CHECK ((date_init < date_end))
);


--
-- TOC entry 174 (class 1259 OID 28020)
-- Name: practice_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE practice_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2061 (class 0 OID 0)
-- Dependencies: 174
-- Name: practice_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE practice_id_seq OWNED BY practice.id;


--
-- TOC entry 185 (class 1259 OID 28114)
-- Name: stat_block; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE stat_block (
    id integer NOT NULL,
    id_game integer NOT NULL,
    title character varying(100) NOT NULL,
    is_default boolean DEFAULT false NOT NULL
);


--
-- TOC entry 186 (class 1259 OID 28118)
-- Name: stat-block_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "stat-block_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2062 (class 0 OID 0)
-- Dependencies: 186
-- Name: stat-block_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "stat-block_id_seq" OWNED BY stat_block.id;


--
-- TOC entry 188 (class 1259 OID 28138)
-- Name: stat_line; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE stat_line (
    id integer NOT NULL,
    id_stat_block integer NOT NULL,
    id_player integer,
    field character varying(100) NOT NULL,
    value character varying(100)
);


--
-- TOC entry 187 (class 1259 OID 28136)
-- Name: stat-line_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "stat-line_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2063 (class 0 OID 0)
-- Dependencies: 187
-- Name: stat-line_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "stat-line_id_seq" OWNED BY stat_line.id;


--
-- TOC entry 164 (class 1259 OID 27935)
-- Name: team; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE team (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    img character varying(100),
    ended boolean DEFAULT false NOT NULL
);


--
-- TOC entry 163 (class 1259 OID 27933)
-- Name: team_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE team_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2064 (class 0 OID 0)
-- Dependencies: 163
-- Name: team_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE team_id_seq OWNED BY team.id;


--
-- TOC entry 169 (class 1259 OID 27962)
-- Name: team_player; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE team_player (
    id_team integer NOT NULL,
    id_player integer NOT NULL
);


--
-- TOC entry 177 (class 1259 OID 28035)
-- Name: workoutplan; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE workoutplan (
    id integer NOT NULL,
    id_login integer NOT NULL,
    title character varying(100),
    material character varying(100),
    objectives character varying(100)
);


--
-- TOC entry 176 (class 1259 OID 28033)
-- Name: workout-plan_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "workout-plan_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2065 (class 0 OID 0)
-- Dependencies: 176
-- Name: workout-plan_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "workout-plan_id_seq" OWNED BY workoutplan.id;


--
-- TOC entry 180 (class 1259 OID 28060)
-- Name: workout_exercise; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE workout_exercise (
    id_workout integer NOT NULL,
    id_exercise integer NOT NULL
);


--
-- TOC entry 1852 (class 2604 OID 28082)
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY attendance ALTER COLUMN id SET DEFAULT nextval('attendance_id_seq'::regclass);


--
-- TOC entry 1838 (class 2604 OID 27947)
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY event ALTER COLUMN id SET DEFAULT nextval('event_id_seq'::regclass);


--
-- TOC entry 1851 (class 2604 OID 28057)
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY exercise ALTER COLUMN id SET DEFAULT nextval('exercise_id_seq'::regclass);


--
-- TOC entry 1854 (class 2604 OID 28104)
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY game ALTER COLUMN id SET DEFAULT nextval('game_id_seq'::regclass);


--
-- TOC entry 1843 (class 2604 OID 27989)
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY info_block ALTER COLUMN id SET DEFAULT nextval('"info-block_id_seq"'::regclass);


--
-- TOC entry 1846 (class 2604 OID 28008)
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY info_line ALTER COLUMN id SET DEFAULT nextval('"info-line_id_seq"'::regclass);


--
-- TOC entry 1835 (class 2604 OID 27928)
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY login ALTER COLUMN id SET DEFAULT nextval('login_id_seq'::regclass);


--
-- TOC entry 1840 (class 2604 OID 27955)
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY player ALTER COLUMN id SET DEFAULT nextval('player_id_seq'::regclass);


--
-- TOC entry 1848 (class 2604 OID 28025)
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY practice ALTER COLUMN id SET DEFAULT nextval('practice_id_seq'::regclass);


--
-- TOC entry 1855 (class 2604 OID 28120)
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY stat_block ALTER COLUMN id SET DEFAULT nextval('"stat-block_id_seq"'::regclass);


--
-- TOC entry 1857 (class 2604 OID 28141)
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY stat_line ALTER COLUMN id SET DEFAULT nextval('"stat-line_id_seq"'::regclass);


--
-- TOC entry 1836 (class 2604 OID 27938)
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY team ALTER COLUMN id SET DEFAULT nextval('team_id_seq'::regclass);


--
-- TOC entry 1850 (class 2604 OID 28038)
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY workoutplan ALTER COLUMN id SET DEFAULT nextval('"workout-plan_id_seq"'::regclass);


--
-- TOC entry 2038 (class 0 OID 28079)
-- Dependencies: 182
-- Data for Name: attendance; Type: TABLE DATA; Schema: public; Owner: -
--

-- COPY attendance (id, id_player, id_practice, status, justification) FROM stdin;
-- \.


--
-- TOC entry 2066 (class 0 OID 0)
-- Dependencies: 181
-- Name: attendance_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('attendance_id_seq', 1, false);


--
-- TOC entry 2022 (class 0 OID 27944)
-- Dependencies: 166
-- Data for Name: event; Type: TABLE DATA; Schema: public; Owner: -
--

-- COPY event (id, id_login, description, date_init, date_end) FROM stdin;
-- \.


--
-- TOC entry 2067 (class 0 OID 0)
-- Dependencies: 165
-- Name: event_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('event_id_seq', 1, false);


--
-- TOC entry 2035 (class 0 OID 28054)
-- Dependencies: 179
-- Data for Name: exercise; Type: TABLE DATA; Schema: public; Owner: -
--

-- COPY exercise (id, description, duration, focus, img) FROM stdin;
-- \.


--
-- TOC entry 2068 (class 0 OID 0)
-- Dependencies: 178
-- Name: exercise_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('exercise_id_seq', 1, false);


--
-- TOC entry 2040 (class 0 OID 28101)
-- Dependencies: 184
-- Data for Name: game; Type: TABLE DATA; Schema: public; Owner: -
--

-- COPY game (id, id_team, date, title) FROM stdin;
-- \.


--
-- TOC entry 2069 (class 0 OID 0)
-- Dependencies: 183
-- Name: game_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('game_id_seq', 1, false);


--
-- TOC entry 2070 (class 0 OID 0)
-- Dependencies: 170
-- Name: info-block_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"info-block_id_seq"', 1, false);


--
-- TOC entry 2071 (class 0 OID 0)
-- Dependencies: 172
-- Name: info-line_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"info-line_id_seq"', 1, false);


--
-- TOC entry 2027 (class 0 OID 27986)
-- Dependencies: 171
-- Data for Name: info_block; Type: TABLE DATA; Schema: public; Owner: -
--

-- COPY info_block (id, id_player, title, type, is_default) FROM stdin;
-- \.


--
-- TOC entry 2029 (class 0 OID 28005)
-- Dependencies: 173
-- Data for Name: info_line; Type: TABLE DATA; Schema: public; Owner: -
--

-- COPY info_line (id, id_info_block, field, value, date) FROM stdin;
-- \.


--
-- TOC entry 2018 (class 0 OID 27925)
-- Dependencies: 162
-- Data for Name: login; Type: TABLE DATA; Schema: public; Owner: -
--

-- COPY login (id, email, password, firstname, lastname, img) FROM stdin;
-- \.


--
-- TOC entry 2072 (class 0 OID 0)
-- Dependencies: 161
-- Name: login_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('login_id_seq', 1, false);


--
-- TOC entry 2045 (class 0 OID 28154)
-- Dependencies: 189
-- Data for Name: login_team; Type: TABLE DATA; Schema: public; Owner: -
--

-- COPY login_team (id_login, id_team) FROM stdin;
-- \.


--
-- TOC entry 2024 (class 0 OID 27952)
-- Dependencies: 168
-- Data for Name: player; Type: TABLE DATA; Schema: public; Owner: -
--

-- COPY player (id, name, birth_date, phone, condition, img) FROM stdin;
-- \.


--
-- TOC entry 2073 (class 0 OID 0)
-- Dependencies: 167
-- Name: player_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('player_id_seq', 1, false);


--
-- TOC entry 2031 (class 0 OID 28022)
-- Dependencies: 175
-- Data for Name: practice; Type: TABLE DATA; Schema: public; Owner: -
--

-- COPY practice (id, id_team, id_workout, local, date_init, date_end) FROM stdin;
-- \.


--
-- TOC entry 2074 (class 0 OID 0)
-- Dependencies: 174
-- Name: practice_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('practice_id_seq', 1, false);


--
-- TOC entry 2075 (class 0 OID 0)
-- Dependencies: 186
-- Name: stat-block_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"stat-block_id_seq"', 1, false);


--
-- TOC entry 2076 (class 0 OID 0)
-- Dependencies: 187
-- Name: stat-line_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"stat-line_id_seq"', 1, false);


--
-- TOC entry 2041 (class 0 OID 28114)
-- Dependencies: 185
-- Data for Name: stat_block; Type: TABLE DATA; Schema: public; Owner: -
--

-- COPY stat_block (id, id_game, title, is_default) FROM stdin;
-- \.


--
-- TOC entry 2044 (class 0 OID 28138)
-- Dependencies: 188
-- Data for Name: stat_line; Type: TABLE DATA; Schema: public; Owner: -
--

-- COPY stat_line (id, id_stat_block, id_player, field, value) FROM stdin;
-- \.


--
-- TOC entry 2020 (class 0 OID 27935)
-- Dependencies: 164
-- Data for Name: team; Type: TABLE DATA; Schema: public; Owner: -
--

-- COPY team (id, name, img, ended) FROM stdin;
-- \.


--
-- TOC entry 2077 (class 0 OID 0)
-- Dependencies: 163
-- Name: team_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('team_id_seq', 1, false);


--
-- TOC entry 2025 (class 0 OID 27962)
-- Dependencies: 169
-- Data for Name: team_player; Type: TABLE DATA; Schema: public; Owner: -
--

-- COPY team_player (id_team, id_player) FROM stdin;
-- \.


--
-- TOC entry 2078 (class 0 OID 0)
-- Dependencies: 176
-- Name: workout-plan_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"workout-plan_id_seq"', 1, false);


--
-- TOC entry 2036 (class 0 OID 28060)
-- Dependencies: 180
-- Data for Name: workout_exercise; Type: TABLE DATA; Schema: public; Owner: -
--

-- COPY workout_exercise (id_workout, id_exercise) FROM stdin;
-- \.


--
-- TOC entry 2033 (class 0 OID 28035)
-- Dependencies: 177
-- Data for Name: workoutplan; Type: TABLE DATA; Schema: public; Owner: -
--

-- COPY workoutplan (id, id_login, title, material, objectives) FROM stdin;
-- \.


--
-- TOC entry 1887 (class 2606 OID 28088)
-- Name: attendance_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY attendance
    ADD CONSTRAINT attendance_pkey PRIMARY KEY (id);


--
-- TOC entry 1865 (class 2606 OID 27949)
-- Name: event_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY event
    ADD CONSTRAINT event_pkey PRIMARY KEY (id);


--
-- TOC entry 1881 (class 2606 OID 28059)
-- Name: exercise_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY exercise
    ADD CONSTRAINT exercise_pkey PRIMARY KEY (id);


--
-- TOC entry 1889 (class 2606 OID 28106)
-- Name: game_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY game
    ADD CONSTRAINT game_pkey PRIMARY KEY (id);


--
-- TOC entry 1873 (class 2606 OID 27995)
-- Name: info-block_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY info_block
    ADD CONSTRAINT "info-block_pkey" PRIMARY KEY (id);


--
-- TOC entry 1875 (class 2606 OID 28014)
-- Name: info-line_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY info_line
    ADD CONSTRAINT "info-line_pkey" PRIMARY KEY (id);


--
-- TOC entry 1859 (class 2606 OID 27932)
-- Name: login_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY login
    ADD CONSTRAINT login_email_key UNIQUE (email);


--
-- TOC entry 1861 (class 2606 OID 27930)
-- Name: login_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY login
    ADD CONSTRAINT login_pkey PRIMARY KEY (id);


--
-- TOC entry 1895 (class 2606 OID 28160)
-- Name: login_team_id_login_id_team_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY login_team
    ADD CONSTRAINT login_team_id_login_id_team_key UNIQUE (id_login, id_team);


--
-- TOC entry 1897 (class 2606 OID 28158)
-- Name: login_team_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY login_team
    ADD CONSTRAINT login_team_pkey PRIMARY KEY (id_login, id_team);


--
-- TOC entry 1867 (class 2606 OID 27961)
-- Name: player_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY player
    ADD CONSTRAINT player_pkey PRIMARY KEY (id);


--
-- TOC entry 1877 (class 2606 OID 28027)
-- Name: practice_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY practice
    ADD CONSTRAINT practice_pkey PRIMARY KEY (id);


--
-- TOC entry 1891 (class 2606 OID 28125)
-- Name: stat-block_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY stat_block
    ADD CONSTRAINT "stat-block_pkey" PRIMARY KEY (id);


--
-- TOC entry 1893 (class 2606 OID 28143)
-- Name: stat-line_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY stat_line
    ADD CONSTRAINT "stat-line_pkey" PRIMARY KEY (id);


--
-- TOC entry 1863 (class 2606 OID 27941)
-- Name: team_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY team
    ADD CONSTRAINT team_pkey PRIMARY KEY (id);


--
-- TOC entry 1869 (class 2606 OID 27983)
-- Name: team_player_id_team_id_player_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY team_player
    ADD CONSTRAINT team_player_id_team_id_player_key UNIQUE (id_team, id_player);


--
-- TOC entry 1871 (class 2606 OID 27966)
-- Name: team_player_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY team_player
    ADD CONSTRAINT team_player_pkey PRIMARY KEY (id_team, id_player);


--
-- TOC entry 1879 (class 2606 OID 28040)
-- Name: workout-plan_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY workoutplan
    ADD CONSTRAINT "workout-plan_pkey" PRIMARY KEY (id);


--
-- TOC entry 1883 (class 2606 OID 28066)
-- Name: workout_exercise_id_workout_id_exercise_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY workout_exercise
    ADD CONSTRAINT workout_exercise_id_workout_id_exercise_key UNIQUE (id_workout, id_exercise);


--
-- TOC entry 1885 (class 2606 OID 28064)
-- Name: workout_exercise_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY workout_exercise
    ADD CONSTRAINT workout_exercise_pkey PRIMARY KEY (id_workout, id_exercise);


--
-- TOC entry 1908 (class 2606 OID 28089)
-- Name: attendance_id_player_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY attendance
    ADD CONSTRAINT attendance_id_player_fkey FOREIGN KEY (id_player) REFERENCES player(id) ON DELETE CASCADE;


--
-- TOC entry 1909 (class 2606 OID 28094)
-- Name: attendance_id_practice_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY attendance
    ADD CONSTRAINT attendance_id_practice_fkey FOREIGN KEY (id_practice) REFERENCES practice(id) ON DELETE CASCADE;


--
-- TOC entry 1898 (class 2606 OID 27967)
-- Name: event_id_login_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY event
    ADD CONSTRAINT event_id_login_fkey FOREIGN KEY (id_login) REFERENCES login(id) ON DELETE CASCADE;


--
-- TOC entry 1910 (class 2606 OID 28107)
-- Name: game_id_team_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY game
    ADD CONSTRAINT game_id_team_fkey FOREIGN KEY (id_team) REFERENCES team(id) ON DELETE CASCADE;


--
-- TOC entry 1901 (class 2606 OID 27996)
-- Name: info-block_id_player_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY info_block
    ADD CONSTRAINT "info-block_id_player_fkey" FOREIGN KEY (id_player) REFERENCES player(id) ON DELETE CASCADE;


--
-- TOC entry 1902 (class 2606 OID 28015)
-- Name: info-line_id_info-block_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY info_line
    ADD CONSTRAINT "info-line_id_info-block_fkey" FOREIGN KEY (id_info_block) REFERENCES info_block(id) ON DELETE CASCADE;


--
-- TOC entry 1914 (class 2606 OID 28161)
-- Name: login_team_id_login_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY login_team
    ADD CONSTRAINT login_team_id_login_fkey FOREIGN KEY (id_login) REFERENCES login(id) ON DELETE CASCADE;


--
-- TOC entry 1915 (class 2606 OID 28166)
-- Name: login_team_id_team_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY login_team
    ADD CONSTRAINT login_team_id_team_fkey FOREIGN KEY (id_team) REFERENCES team(id) ON DELETE CASCADE;


--
-- TOC entry 1903 (class 2606 OID 28028)
-- Name: practice_id_team_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY practice
    ADD CONSTRAINT practice_id_team_fkey FOREIGN KEY (id_team) REFERENCES team(id) ON DELETE CASCADE;


--
-- TOC entry 1904 (class 2606 OID 28047)
-- Name: practice_id_workout_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY practice
    ADD CONSTRAINT practice_id_workout_fkey FOREIGN KEY (id_workout) REFERENCES workoutplan(id) ON DELETE CASCADE;


--
-- TOC entry 1911 (class 2606 OID 28126)
-- Name: stat-block_id_game_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY stat_block
    ADD CONSTRAINT "stat-block_id_game_fkey" FOREIGN KEY (id_game) REFERENCES game(id) ON DELETE CASCADE;


--
-- TOC entry 1913 (class 2606 OID 28149)
-- Name: stat-line_id_player_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY stat_line
    ADD CONSTRAINT "stat-line_id_player_fkey" FOREIGN KEY (id_player) REFERENCES player(id) ON DELETE SET NULL;


--
-- TOC entry 1912 (class 2606 OID 28144)
-- Name: stat-line_id_stat-block_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY stat_line
    ADD CONSTRAINT "stat-line_id_stat-block_fkey" FOREIGN KEY (id_stat_block) REFERENCES stat_block(id) ON DELETE CASCADE;


--
-- TOC entry 1900 (class 2606 OID 27977)
-- Name: team_player_id_player_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY team_player
    ADD CONSTRAINT team_player_id_player_fkey FOREIGN KEY (id_player) REFERENCES player(id) ON DELETE CASCADE;


--
-- TOC entry 1899 (class 2606 OID 27972)
-- Name: team_player_id_team_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY team_player
    ADD CONSTRAINT team_player_id_team_fkey FOREIGN KEY (id_team) REFERENCES team(id) ON DELETE CASCADE;


--
-- TOC entry 1905 (class 2606 OID 28042)
-- Name: workout-plan_id_login_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY workoutplan
    ADD CONSTRAINT "workout-plan_id_login_fkey" FOREIGN KEY (id_login) REFERENCES login(id) ON DELETE CASCADE;


--
-- TOC entry 1907 (class 2606 OID 28072)
-- Name: workout_exercise_id_exercise_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY workout_exercise
    ADD CONSTRAINT workout_exercise_id_exercise_fkey FOREIGN KEY (id_exercise) REFERENCES exercise(id) ON DELETE CASCADE;


--
-- TOC entry 1906 (class 2606 OID 28067)
-- Name: workout_exercise_id_workout_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY workout_exercise
    ADD CONSTRAINT workout_exercise_id_workout_fkey FOREIGN KEY (id_workout) REFERENCES workoutplan(id) ON DELETE CASCADE;


-- Completed on 2014-10-30 14:39:00

--
-- PostgreSQL database dump complete
--

