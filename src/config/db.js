import pkg from "pg";
const { Pool } = pkg;

// creating a pool of connection
const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DB,
  password: process.env.PASSWORD,
  port: process.env.DBPORT,
});
