"use strict";

require("dotenv/config");
const express = require("express");
const morgan = require("morgan");
const sanitizeMongo = require("express-mongo-sanitize");

const logger = require("./utils/logger");
const sanitizeBody = require("./middleware/sanitzeBody");
const studentRouter = require("./router/students");
const { errorHandler } = require("./utils/errors");

require("./utils/db");

const app = express();

// this just tells express to expect JSON data in the request body
app.use(express.json());
app.use(morgan("tiny"));
app.use(sanitizeMongo());

app.use("/api/students", sanitizeBody, studentRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, (err) => {
  if (err) {
    logger.error(err);
    process.exit(1);
  }
  logger.info(`Server running on port ${PORT}`);
});
