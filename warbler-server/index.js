const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const errorHandler = require("./handlers/error");

const PORT = 8081;

app.use(cors());
app.use(bodyParser.json());

// all routes goes here

// Global error handling
app.use((req, res, next) => {
  let err = new Error("Not found");
  err.status = 404;
  next(err);
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`);
});
