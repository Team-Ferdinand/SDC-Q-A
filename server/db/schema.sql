
DROP TABLE IF EXISTS questions CASCADE;
DROP TABLE IF EXISTS answers CASCADE;
DROP TABLE IF EXISTS answers_photos CASCADE;

CREATE TABLE IF NOT EXISTS questions(
  id SERIAL NOT NULL,
  product_id INTEGER NOT NULL,
  body varchar(255) DEFAULT NULL,
  date_written bigint,
  asker_name varchar(255) DEFAULT NULL,
  asker_email varchar(255)DEFAULT NULL,
  reported BOOLEAN DEFAULT NULL,
  helpful INTEGER DEFAULT NULL,
  PRIMARY KEY (id)
);

COPY questions(id,product_id,body,date_written,asker_name,asker_email,reported,helpful)
FROM '/Users/dmcin003/Desktop/SDC/SDC-Q-A/data/questions.csv'
DELIMITER ','
CSV HEADER;



CREATE TABLE IF NOT EXISTS answers(
  id SERIAL NOT NULL,
  question_id INTEGER NOT NULL,
  body varchar(255) DEFAULT NULL,
  date_written bigint,
  answerer_name varchar(255) DEFAULT NULL,
  answerer_email varchar(255) DEFAULT NULL,
  reported BOOLEAN DEFAULT NULL,
  helpful INTEGER DEFAULT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (question_id)
  REFERENCES Questions (id)
);

COPY answers(id,question_id,body,date_written,answerer_name,answerer_email,reported,helpful)
FROM '/Users/dmcin003/Desktop/SDC/SDC-Q-A/data/answers.csv'
DELIMITER ','
CSV HEADER;


CREATE TABLE IF NOT EXISTS answers_photos(
  id SERIAL NOT NULL,
  answer_id INTEGER NOT NULL,
  url varchar(450) DEFAULT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (answer_id)
  REFERENCES Answers (id)
);

COPY answers_photos(id,answer_id,url)
FROM '/Users/dmcin003/Desktop/SDC/SDC-Q-A/data/answers_photos.csv'
DELIMITER ','
CSV HEADER;

-- select to_timestamp(cast(date_written/1000 as bigint))::date
-- from questions


-- SELECT to_timestamp(CAST(date_written as bigint)/1000)
-- FROM answers




ALTER TABLE answers
ALTER COLUMN date_written TYPE timestamptz USING to_timestamp(CAST(date_written as bigint)/1000);

ALTER TABLE questions
ALTER COLUMN date_written TYPE timestamptz USING to_timestamp(CAST(date_written as bigint)/1000);