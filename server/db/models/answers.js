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
        where answers.question_id=${question_id}
        offset ${(page - 1) * count}
        limit ${count}



        `
    );
  },
};
