"use strict";

const { createLogger, format, transports } = require("winston");
const { combine, timestamp, colorize, label, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label.toUpperCase()}] ${level}: ${message}`;
});

const logger = createLogger({
  level: "info",
  format: combine(timestamp(), format.json()),
  defaultMeta: { service: "student-service" },
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log`
    // - Write all logs error (and below) to `error.log`.
    //
    new transports.File({ filename: "error.log", level: "error" }),
    new transports.File({ filename: "combined.log" }),
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: combine(label({ label: "test" }), timestamp(), colorize(), myFormat),
    })
  );
}

module.exports = logger;
