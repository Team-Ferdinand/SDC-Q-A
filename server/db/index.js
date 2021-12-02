// const db = require("../../config/config.js");
const { Pool } = require("pg");
const dotenv = require("dotenv");
dotenv.config();

const pool = new Pool({
  user: process.env.DATABASE_USER,
  //host: "host.docker.internal",
  host: "ec2-18-117-12-60.us-east-2.compute.amazonaws.com",
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASS,
  port: 5432,
});

// const pool = new Pool(db.CONFIG);

pool.connect(() => {
  console.log("connected to db");
});

module.exports.pool = pool;
