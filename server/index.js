const express = require("express");
const morgan = require("morgan");
const db = require("./db/index.js");
const Q = require("./db/models/questions.js");
const A = require("./db/models/answers.js");
const app = express();
const port = 3000;

//middleware

app.use(express.json());
app.use(morgan("dev"));

//routes
app.get("/", (req, res) => {
  res.json(`Welcome to Darron's API service`);
});

app.get("/qa/questions", (req, res) => {
  console.log(req.query);

  const product_id = req.query.product_id || undefined;

  const count = req.query.count || 5;

  const page = req.query.page || 1;

  let response = {
    product_id: product_id,
    results: [],
  };

  if (product_id) {
    Q.getQuestions(product_id, count, page)
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

  A.getAnswers(question_id, page, count)
    .then(({ rows }) => {
      response.results = rows;
      res.json(response);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.post("/qa/questions", (req, res) => {
  Q.maxId()
    .then(({ rows }) => {
      let id = rows[0].max + 1;
      return Q.create(req.body, id);
    })
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log(err);
    });
});

app.post(`/qa/questions/:question_id/answers`, (req, res) => {
  const question_id = req.params.question_id;
  let created_answer_id;
  let answers_photo_id;
  let promises = [];
  A.maxAnswersID()
    .then(({ rows }) => {
      created_answer_id = rows[0].max + 1;
      return A.create(req.body, question_id, created_answer_id);
    })
    .then((data) => {
      return A.maxPhotosID();
    })
    .then(({ rows }) => {
      const maxId = rows[0].max;
      const promises = req.body.photos.map((url, index) => {
        console.log("🚀 ~ file: index.js ~ line 102 ~ promises ~ index", index);
        let photoId = maxId + (index + 1);
        console.log(
          "🚀 ~ file: index.js ~ line 103 ~ promises ~ photoId",
          photoId
        );

        return A.insertPhoto(photoId, created_answer_id, url);
      });

      return Promise.all(promises);
    })
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log(err);
    });
});

app.put(`/qa/questions/:question_id/helpful`, (req, res) => {
  const question_id = req.params.question_id;
  console.log(
    "🚀 ~ file: index.js ~ line 104 ~ app.put ~ question_id",
    question_id
  );
  Q.updateHelpfulness(question_id)
    .then((data) => {
      res.status(204).end();
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log(err);
    });
});

app.put(`/qa/questions/:question_id/report`, (req, res) => {
  const question_id = req.params.question_id;
  console.log(
    "🚀 ~ file: index.js ~ line 104 ~ app.put ~ question_id",
    question_id
  );
  Q.updateReport(question_id)
    .then((data) => {
      res.status(204).end();
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log(err);
    });
});

app.put(`/qa/answers/:answer_id/helpful`, (req, res) => {
  const answer_id = req.params.answer_id;
  console.log(
    "🚀 ~ file: index.js ~ line 104 ~ app.put ~ question_id",
    answer_id
  );
  A.updateReport(answer_id)
    .then((data) => {
      res.status(204).end();
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log(err);
    });
});

app.put(`/qa/answers/:answer_id/report`, (req, res) => {
  const answer_id = req.params.answer_id;
  console.log(
    "🚀 ~ file: index.js ~ line 104 ~ app.put ~ question_id",
    answer_id
  );
  A.updateReport(answer_id)
    .then((data) => {
      res.status(204).end();
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log(err);
    });
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`server is listening on port ${port}`);
});

// module.exports.app = app;
