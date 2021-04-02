const express = require("express");
const app = express();
const PORT = process.env.PORT || 5002;
const db = require("./db/db_conn");
const router = require("./routes/router");

// Body parser Middleware

app.use(express.json());
app.use("/api/v1", router);

// Initializing DB
db();

app.listen(
  PORT,
  console.log(
    `Server started in the port ${PORT} Successfully`.black.bgBrightGreen
  )
);
