const db = require("../index.js");

module.exports = {
  getAnswers: (question_id, page, count) => {
    return db.pool.query(
      `select answers.id,answers.body,answers.date_written, answers.answerer_name,
        answers.answerer_email,answers.reported,answers.helpful,
        (select json_agg(json_build_object('id',answers_photos.id,'url',answers_photos.url))photos
         from answers_photos
         where answers_photos.answer_id=answers.id
        )
        from answers
        where answers.question_id=${question_id} and answers.reported=false
        offset ${(page - 1) * count}
        limit ${count}



        `
    );
  },

  maxAnswersID: () => {
    return db.pool.query("select max(id) from answers");
  },

  create: ({ body, name, email }, question_id, id) => {
    const date = new Date();
    const helpful = 0;
    const reported = false;

    return db.pool
      .query(`insert into answers(id,question_id, body, date_written ,answerer_name, answerer_email, reported, helpful)
    values(${id},${question_id},'${body}',to_timestamp(${date} / 1000.0),'${name}','${email}',${reported},${helpful})`);
  },

  maxPhotosID: () => {
    return db.pool.query("select max(id) from answers_photos");
  },

  insertPhoto: (photo) => {
    return db.pool.query(`insert into answers_photos(id,answer_id,url)
      values(${id},${answer_id},${url})`);
  },

  updateHelpfulness: (answer_id) => {
    return db.pool.query(
      `update answers set helpful=helpful + 1 where id=${answer_id}
      returning *`
    );
  },

  updateReport: (answer_id) => {
    return db.pool.query(
      `update answers set reported=true where id=${answer_id}
      returning *`
    );
  },
};
