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
  const page = req.query.page || 1;

  const response = { product_id: product_id, results: [] };

  if (product_id) {
    qModel
      .getQuestions(product_id, count, page)
      .then(({ rows }) => {
        response.results = rows;
        // res.json(data);
        const promises = rows.map((question) => {
          return aModel.getAnswers(question.id);
        });
        return Promise.all(promises);
      })
      .then((data) => {
        const answers = data.map((answer) => {
          return answer.rows;
        });

        for (let i = 0; i < response.results.length; i++) {
          response.results[i].answers = answers[i];
          for (let j = 0; j < response.results[i].answers.length; j++) {}
        }

        res.json(answers);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  } else {
    res.status(500).send("Invalid product id");
  }
});

app.get(`/qa/questions/:question_id/answers`, (req, res) => {
  const question_id = req.params.question_id;
  console.log(question_id);
  aModel
    .getAnswers(question_id)
    .then(({ rows }) => {
      const promises = rows.map((answer) => {
        return aModel.getPhotos(answer.id);
      });
      return Promise.all(promises);
    })
    .then((data) => {
      const photos = data.map((photo) => {
        return photo.rows;
      });
      res.json(photos);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.post("/qa/questions", (req, res) => {
  res.json("we posting");
});

app.post(`/qa/questions/:question_id/answers`, (req, res) => {
  res.json(req.params);
});

//set to 'helpful or report'
const updatee = "";

app.put(`/qa/questions/:qustion_id/${updatee}`, (req, res) => {
  res.json(req.params);
});

app.put(`/qa/answers/:answer_id/${updatee}`, (req, res) => {
  res.json(req.params);
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`server is listening on port ${port}`);
});
