const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "QA",
  password: "",
  port: 5432,
});

pool.connect(() => {
  console.log("connected to db");
});

module.exports.pool = pool;
