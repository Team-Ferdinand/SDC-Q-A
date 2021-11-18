const db = require("../index.js");

module.exports = {
  getQuestions: (product_id, count = undefined, page = undefined) => {
    return db.pool.query(
      `select * from Questions where product_id = ${product_id} limit ${count}`
    );
  },
};
