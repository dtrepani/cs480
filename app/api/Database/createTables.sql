CREATE TABLE IF NOT EXISTS person (
	id				INT						NOT NULL AUTO_INCREMENT,
	name			VARCHAR(32)				NOT NULL,
	password		VARCHAR(512)			NOT NULL,
	admin			BOOLEAN DEFAULT FALSE,
	theme			ENUM('light', 'dark')	NOT NULL,
	week_start		ENUM('su', 'mo')		NOT NULL,
	time_zone		INT,
	avatar			TEXT,
	email			VARCHAR(64),
	phone_number	INT,
	notify_email	BOOLEAN,
	notify_text		BOOLEAN,
	PRIMARY KEY (id),
	UNIQUE KEY (name)
);

CREATE TABLE IF NOT EXISTS session (
	id				VARCHAR(32)	NOT NULL,
	last_accessed	DATETIME,
	data			TEXT,
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS activity_info (
	id				INT			NOT NULL AUTO_INCREMENT,
	summary			VARCHAR(256)	NOT NULL,
	created			DATETIME	NOT NULL,
	color			VARCHAR(32),
	note			TEXT,
	reminder		DATETIME,
	priority		ENUM('normal', 'low', 'high') NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS recurrence (
	id					INT		NOT NULL AUTO_INCREMENT,
	activity_info_id	INT				NOT NULL,
	freq			ENUM('daily', 'secondly', 'minutely', 'hourly', 'weekly', 'monthly', 'yearly') NOT NULL,
	until			DATETIME,
	count			INT,
	repeat_interval	INT		NOT NULL DEFAULT 1,
	# by_(?!set_pos).* are stored in serialized arrays
	by_second		TEXT,
	by_minute		TEXT,
	by_hour			TEXT,
	by_day			TEXT,
	by_month_day	TEXT,
	by_year_day		TEXT,
	by_week_no		TEXT,
	by_month 		TEXT,
	by_set_pos		INT,
	PRIMARY KEY (id),
	FOREIGN KEY (activity_info_id)
		REFERENCES activity_info(id)
		ON UPDATE CASCADE
		ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS calendar (
	id				INT			NOT NULL AUTO_INCREMENT,
	person_id		INT 		NOT NULL,
	name			VARCHAR(64)	NOT NULL,
	visible			BOOLEAN DEFAULT true,
	PRIMARY KEY (id),
	FOREIGN KEY (person_id)
		REFERENCES person(id)
		ON UPDATE CASCADE
		ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS cal_event (
	id					INT				NOT NULL AUTO_INCREMENT,
	calendar_id			INT 			NOT NULL,
	activity_info_id	INT				NOT NULL,
	dt_start			DATETIME,
	dt_end				DATETIME,
	description			TEXT,
	location			VARCHAR(256),
	PRIMARY KEY (id),
	FOREIGN KEY (calendar_id)
		REFERENCES calendar(id)
		ON UPDATE CASCADE
		ON DELETE CASCADE,
	FOREIGN KEY (activity_info_id)
		REFERENCES activity_info(id)
		ON UPDATE CASCADE
		ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS label (
	id				INT			NOT NULL AUTO_INCREMENT,
	person_id		INT 		NOT NULL,
	name			VARCHAR(64)	NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (person_id)
		REFERENCES person(id)
		ON UPDATE CASCADE
		ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS task (
	id					INT				NOT NULL AUTO_INCREMENT,
	label_id			INT 			NOT NULL,
	activity_info_id	INT				NOT NULL,
	due					DATETIME,
	completed			BOOLEAN DEFAULT false,
	picture				TEXT,
	PRIMARY KEY (id),
	FOREIGN KEY (label_id)
		REFERENCES label(id)
		ON UPDATE CASCADE
		ON DELETE CASCADE,
	FOREIGN KEY (activity_info_id)
		REFERENCES activity_info(id)
		ON UPDATE CASCADE
		ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS subtask (
	id				INT				NOT NULL AUTO_INCREMENT,
	task_id			INT 			NOT NULL,
	summary 		VARCHAR(256)	NOT NULL,
	completed		BOOLEAN DEFAULT false,
	PRIMARY KEY (id),
	FOREIGN KEY (task_id)
		REFERENCES task(id)
		ON UPDATE CASCADE
		ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS calendar_user (
	calendar_id		INT		NOT NULL,
	person_id		INT		NOT NULL,
	PRIMARY KEY (calendar_id, person_id),
	FOREIGN KEY (calendar_id)
		REFERENCES calendar(id)
		ON UPDATE CASCADE
		ON DELETE CASCADE,
	FOREIGN KEY (person_id)
		REFERENCES person(id)
		ON UPDATE CASCADE
		ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS label_user (
	label_id		INT		NOT NULL,
	person_id		INT		NOT NULL,
	PRIMARY KEY (label_id, person_id),
	FOREIGN KEY (label_id)
		REFERENCES label(id)
		ON UPDATE CASCADE
		ON DELETE CASCADE,
	FOREIGN KEY (person_id)
		REFERENCES person(id)
		ON UPDATE CASCADE
		ON DELETE CASCADE
);
