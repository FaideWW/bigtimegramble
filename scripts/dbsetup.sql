DROP TABLE if exists "btg_goal";
DROP TABLE if exists "btg_penalty";
DROP TABLE if exists "btg_game";
DROP TABLE if exists "btg_statistic";
DROP TABLE if exists "btg_player";
DROP TABLE if exists "btg_team";
DROP TABLE if exists "btg_record";
DROP TABLE if exists "btg_division";

DROP TYPE if exists "btg_player_position";
DROP TYPE if exists "btg_period";

CREATE TYPE btg_player_position as ENUM ('C', 'RW', 'LW', 'D', 'G');
CREATE TYPE btg_period as ENUM ('1st', '2nd', '3rd', 'OT', 'SO');

CREATE TABLE btg_division(
  divisionID serial primary key,
  name character varying(100) not null
);

CREATE TABLE btg_record(
  recordID serial primary key,
  gp smallint not null default 0,
  w smallint not null default 0,
  l smallint not null default 0,
  otl smallint not null default 0
);

CREATE TABLE btg_team (
  teamID serial primary key,
  espnID character varying(5),
  location character varying(100) not null,
  teamName character varying (100) not null,
  divisionID int references btg_division(divisionID),
  recordID int references btg_record(recordID)
);

CREATE TABLE btg_statistic (
  statID serial primary key,
  description character varying (200) not null,
  gp smallint not null default 1,
  toi smallint not null default 0,
  pim smallint not null default 0,
  g smallint not null default 0,
  a smallint not null default 0,
  plusminus smallint not null default 0,
  sog smallint not null default 0,
  spct smallint not null default 0,
  ppg smallint not null default 0,
  ppa smallint not null default 0,
  shg smallint not null default 0,
  sha smallint not null default 0,
  gwg smallint not null default 0,
  gs smallint not null default 1,
  recordID int references btg_record(recordID),
  ga smallint not null default 0,
  sa smallint not null default 0
);

CREATE TABLE btg_player (
  playerID serial primary key,
  name character varying(200) not null,
  teamID int references btg_team(teamID),
  pos btg_player_position not null,
  jerseyNum smallint not null,
  height smallint,
  weight smallint,
  dob date,
  seasonStats int references btg_statistic(statID),
  overallStats int references btg_statistic(statID)
);

CREATE TABLE btg_game (
  gameID serial primary key,
  espnID int,
  awayTeam int references btg_team(teamID),
  homeTeam int references btg_team(teamID),
  startTime timestamp with time zone,
  timeRemaining smallint not null default 1200,
  currPeriod btg_period not null default '1st',
  isFinal boolean not null default false
);

CREATE TABLE btg_goal (
  goalID serial primary key,
  gameID int references btg_game(gameID),
  period btg_period not null,
  time smallint default 0,
  scorer int references btg_player(playerID),
  assistant1 int references btg_player(playerID),
  assistant2 int references btg_player(playerID)
);

CREATE TABLE btg_penalty (
  penaltyID serial primary key,
  gameID int references btg_game(gameID),
  period btg_period not null,
  time smallint not null default 0,
  offender int references btg_player(playerID),
  offense character varying(50),
  punishment character varying(50)
);