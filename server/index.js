const express = require("express");
const morgan = require("morgan");
const db = require("./db/index.js");
const app = express();
const port = 3000;

//middleware

app.use(express.json());
app.use(morgan("dev"));

//server

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`server is listening on port ${port}`);
});

app.get("/", (req, res) => {
  db.client
    .query(`select * from Questions where asker_name = 'coolkid'`)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});
