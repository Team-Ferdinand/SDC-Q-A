const db = require("../index.js");

module.exports = {
  getAnswers: (question_id, count = undefined, page = undefined) => {
    return db.pool.query(
      `select * from Answers where question_id = ${question_id} limit 10`
    );
  },

  getPhotos: (answer_id) => {
    return db.pool.query(
      `select * from Answers_photos where answer_id = ${answer_id}`
    );
  },
};
