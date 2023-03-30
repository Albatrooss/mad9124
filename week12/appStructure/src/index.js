"use strict";

require("dotenv/config");
const express = require("express");
const morgan = require("morgan");
const sanitizeBody = require('./middleware/sanitizeBody');
require("./utils/db");

const studentRouter = require("./router/students");
const { errorHandler } = require("./utils/errors");

const app = express();

// this just tells express to expect JSON data in the request body
app.use(express.json());
app.use(morgan("tiny"));

app.use("/students", sanitizeBody, studentRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server running on port ${PORT}`);
});
