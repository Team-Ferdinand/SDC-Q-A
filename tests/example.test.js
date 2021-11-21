const questions = require("../server/db/models/questions.js");

test("I am an example test", () => {
  const product_id = 1;
  questions.getQuestions(product_id, count, page);
  expect("Testing the speed of this query");
});
