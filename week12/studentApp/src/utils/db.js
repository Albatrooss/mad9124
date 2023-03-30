"use strict";

const mongoose = require("mongoose");
const logger = require("./logger");
mongoose.connect(process.env.MONGO_URL).then(() => {
  logger.error(`Connected to mongo ${process.env.MONGO_URL}`);
});
