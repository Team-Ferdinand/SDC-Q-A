CREATE TABLE IF NOT EXISTS Questions(
  id SERIAL NOT NULL,
  product_id INTEGER NOT NULL,
  body varchar(255) DEFAULT NULL,
  date_written varchar(255) DEFAULT NULL,
  asker_name varchar(255) DEFAULT NULL,
  asker_email varchar(255),
  reported BOOLEAN DEFAULT NULL,
  helpful INTEGER DEFAULT NULL,
  PRIMARY KEY (id)
);

COPY Questions(id,product_id,body,date_written,asker_name,asker_email,reported,helpful)
FROM '/Users/dmcin003/Desktop/SDC/SDC-Q-A/data/questions.csv'
DELIMITER ','
CSV HEADER;


CREATE TABLE IF NOT EXISTS Answers(
  id SERIAL NOT NULL,
  question_id INTEGER NOT NULL,
  body varchar(255) DEFAULT NULL,
  date_written varchar(255) DEFAULT NULL,
  answerer_name varchar(255) DEFAULT NULL,
  answerer_email varchar(255) DEFAULT NULL,
  reported BOOLEAN DEFAULT NULL,
  helpful INTEGER DEFAULT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (question_id)
  REFERENCES Questions (id)
);

COPY Answers(id,question_id,body,date_written,answerer_name,answerer_email,reported,helpful)
FROM '/Users/dmcin003/Desktop/SDC/SDC-Q-A/data/answers.csv'
DELIMITER ','
CSV HEADER;

CREATE TABLE IF NOT EXISTS Answers_photos(
  id SERIAL NOT NULL,
  answer_id INTEGER NOT NULL,
  url varchar(450) DEFAULT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (answer_id)
  REFERENCES Answers (id)
);

COPY Answers_photos(id,answer_id,url)
FROM '/Users/dmcin003/Desktop/SDC/SDC-Q-A/data/answers_photos.csv'
DELIMITER ','
CSV HEADER;