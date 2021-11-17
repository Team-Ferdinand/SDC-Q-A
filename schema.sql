CREATE TABLE IF NOT EXISTS Questions(
  id INTEGER NOT NULL,
  product_id INTEGER,
  body varchar(255),
  date_written varchar(255),
  asker_name varchar(255),
  asker_email varchar(255),
  reported BOOLEAN,
  helpful INTEGER,
  PRIMARY KEY (id)
);

COPY Questions(id,product_id,body,date_written,asker_name,asker_email,reported,helpful)
FROM '/Users/dmcin003/Desktop/SDC/SDC-Q-A/data/questions.csv'
DELIMITER ','
CSV HEADER;


CREATE TABLE IF NOT EXISTS Answers(
  id INTEGER NOT NULL,
  question_id INTEGER,
  body varchar(255),
  date_written varchar(255),
  answerer_name varchar(255),
  answerer_email varchar(255),
  reported BOOLEAN,
  helpful INTEGER,
  PRIMARY KEY (id),
  FOREIGN KEY (question_id)
  REFERENCES Questions (id)
);

COPY Answers(id,question_id,body,date_written,answerer_name,answerer_email,reported,helpful)
FROM '/Users/dmcin003/Desktop/SDC/SDC-Q-A/data/answers.csv'
DELIMITER ','
CSV HEADER;

CREATE TABLE IF NOT EXISTS Answers_photos(
  id INTEGER NOT NULL,
  answer_id INTEGER,
  url varchar(450),
  PRIMARY KEY (id),
  FOREIGN KEY (answer_id)
  REFERENCES Answers (id)
);

COPY Answers_photos(id,answer_id,url)
FROM '/Users/dmcin003/Desktop/SDC/SDC-Q-A/data/answers_photos.csv'
DELIMITER ','
CSV HEADER;