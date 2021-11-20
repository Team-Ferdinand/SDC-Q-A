const db = require("../index.js");

module.exports = {
  getQuestions: (product_id, count, page) => {
    return db.pool.query(
      `select q.id,q.body,q.date_written,q.asker_name,
      q.asker_email,q.reported,q.helpful,
      (select json_object_agg(a.id,
        json_build_object('id',a.id,'body',a.body,
        'date',a.date_written,
        'answerer_name',a.answerer_name,'answerer_email',a.answerer_email,
        'reported',a.reported,'helpful',a.helpful,'photos',
        (select json_agg(json_build_object('id',ap.id,'url',ap.url))photos
        from answers_photos as ap
        where ap.answer_id=a.id
       ) ))answers
         from answers as a
         where a.question_id=q.id
        )
      from questions as q
      where q.product_id=${product_id}
      offset ${(page - 1) * count}
      limit ${count}`
    );
  },

  create: () => {
    const date = new Date();
    console.log("🚀 ~ file: questions.js ~ line 29 ~ date", date);

    // return db.pool.query(
    //   `insert into questions(body,asker_name,asker_email,product_id)`
    // )
  },
};

// id SERIAL NOT NULL,
//   product_id INTEGER NOT NULL,
//   body varchar(255) DEFAULT NULL,
//   date_written bigint,
//   asker_name varchar(255) DEFAULT NULL,
//   asker_email varchar(255)DEFAULT NULL,
//   reported BOOLEAN DEFAULT NULL,
//   helpful INTEGER DEFAULT NULL,
