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
         where a.question_id=q.id and a.reported=false
        )
      from questions as q
      where q.product_id=${product_id}
      offset ${(page - 1) * count}
      limit ${count}`
    );
  },

  maxId: () => {
    return db.pool.query("select max(id) from questions");
  },

  create: ({ body, name, email, product_id }, id) => {
    console.log("🚀 ~ file: questions.js ~ line 32 ~ id", id);
    const date = Date.now();
    console.log("🚀 ~ file: questions.js ~ line 34 ~ date", date);
    const helpful = 0;
    const reported = false;

    return db.pool
      .query(`insert into questions(id,product_id, body,date_written,asker_name, asker_email, reported, helpful)
    values(${id},${product_id},'${body}',to_timestamp(${date} / 1000.0),'${name}','${email}',${reported},${helpful})`);
  },

  updateHelpfulness: (question_id) => {
    return db.pool.query(
      `update questions set helpful=helpful + 1 where id=${question_id}
      returning *`
    );
  },

  updateReport: (question_id) => {
    return db.pool.query(
      `update questions set reported=true where id=${question_id}
      returning *`
    );
  },
};
