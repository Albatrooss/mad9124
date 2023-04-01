"use strict";

require("dotenv/config");
const compression = require("compression");
const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const sanitizeBody = require("./middleware/sanitizeBody");
const sanitizeMongo = require("express-mongo-sanitize");
require("./utils/db");

const studentRouter = require("./router/students");
const { errorHandler } = require("./utils/errors");
const logger = require("./utils/logger");

const app = express();

// this just tells express to expect JSON data in the request body
app.use(express.json());
app.use(morgan("tiny"));
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(sanitizeMongo());

app.use("/students", sanitizeBody, studentRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
  if (err) {
    logger.error(err);
    process.exit(1);
  }
  logger.debug(`Server running on port ${PORT}`);
});
