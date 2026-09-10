import pkg from "pg";
import dotenv from "dotenv";
const { Pool } = pkg;

dotenv.config();

// creating a pool of connection while connecting to the DB on server startup
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// fired when new physical connection established with the DB
pool.on("connect", () => {
  console.log("Connection pool established with the DB!");
});

export default pool;
