const express = require("express");
const morgan = require("morgan");
const db = require("./db/index.js");
const qModel = require("./db/models/questions.js");
const aModel = require("./db/models/answers.js");
const app = express();
const port = 3000;

//middleware

app.use(express.json());
app.use(morgan("dev"));

//routes
app.get("/qa/questions", (req, res) => {
  console.log(req.query);

  const product_id = req.query.product_id || undefined;

  const count = req.query.count || 5;
  console.log(
    "🚀 ~ file: index.js ~ line 21 ~ app.get ~ req.query.count",
    req.query.count
  );
  console.log("🚀 ~ file: index.js ~ line 20 ~ app.get ~ count", count);
  const page = req.query.page || 1;
  console.log("🚀 ~ file: index.js ~ line 22 ~ app.get ~ page", page);

  let response = {
    product_id: product_id,
    results: [],
  };

  if (product_id) {
    qModel
      .getQuestions(product_id, count, page)
      .then(({ rows }) => {
        response.results = rows;
        res.json(response);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  } else {
    res.status(500).send("Invalid product id");
  }
});

app.get(`/qa/questions/:question_id/answers`, (req, res) => {
  const question_id = req.params.question_id || undefined;
  const count = req.query.count || 5;
  const page = req.query.page || 1;

  let response = {
    question: question_id,
    page: page,
    count: count,
    results: [],
  };

  aModel
    .getAnswers(question_id, page, count)
    .then(({ rows }) => {
      response.results = rows;
      res.json(response);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.post("/qa/questions", (req, res) => {
  qModel.create();
  res.json(req.body);
});

app.post(`/qa/questions/:question_id/answers`, (req, res) => {
  res.json(req.params);
});

//set to 'helpful or report'

app.put(`/qa/questions/:qustion_id/helpful`, (req, res) => {
  res.json(req.params);
});

app.put(`/qa/questions/:qustion_id/report`, (req, res) => {
  res.json(req.params);
});

app.put(`/qa/answers/:answer_id/helpful`, (req, res) => {
  res.json(req.params);
});

app.put(`/qa/answers/:answer_id/report`, (req, res) => {
  res.json(req.params);
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`server is listening on port ${port}`);
});
