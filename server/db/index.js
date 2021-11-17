const { Client } = require("pg");

const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "QA",
  password: "",
  port: 5432,
});

client
  .connect()
  .then(() => {
    console.log("Connected to Db");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports.client = client;
