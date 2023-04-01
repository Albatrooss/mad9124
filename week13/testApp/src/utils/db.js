const mongoose = require("mongoose");
const createLogger = require("./logger");
const logger = createLogger("db");

mongoose.connect(process.env.MONGO_URL).then(() => {
  logger.info(`connected to mongo at ${process.env.MONGO_URL}`);
});
