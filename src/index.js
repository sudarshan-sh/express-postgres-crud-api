// import "dotenv/config";
import express from "express";
import cors from "cors";
import pool from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import errorHandling from "./middlewares/errorHandler.js";
import createUserTable from "./data/createUserTable.js";

const app = express();
const port = process.env.PORT || 5001;

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api", userRoutes);

// CREATE TABLE before starting server
createUserTable();

// error handling middleware
app.use(errorHandling);

// testing Postgres connection
app.get("/", async (req, res) => {
  console.log("start");
  const result = await pool.query("SELECT current_database()");
  console.log("end");
  res.send(`The database name is: ${result.rows[0].current_database}`);
});

// server running
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
