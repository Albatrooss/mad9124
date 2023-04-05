"use strict";

require("dotenv/config");
const express = require("express");
const morgan = require("morgan");
require("./utils/db");

const createLogger = require("./utils/logger");
const studentRouter = require("./router/students");
const { errorHandler } = require("./utils/errors");
const sanitizeBody = require('./middleware/sanitizeBody');

const app = express();
const logger = createLogger("index");

// this just tells express to expect JSON data in the request body
app.use(express.json());
app.use(morgan("tiny"));

app.use("/api/students", sanitizeBody, studentRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  logger.info(`Server running on port ${PORT}`);
});
