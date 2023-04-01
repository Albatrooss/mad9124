"use strict";

const winston = require("winston");
const { combine, timestamp, json, colorize, label, printf } = winston.format;

const myFormat = printf(
  ({ level, message, label, timestamp }) =>
    `${timestamp} [${label}] ${level}: ${message}`
);

const getFormat = (l) => {
  if (process.env.NODE_ENV === "production") {
    return combine(timestamp(), json());
  }
  return combine(label({ label: l }), timestamp(), colorize(), myFormat);
};

const createLogger = (label) =>
  winston.createLogger({
    level: process.env.NODE_ENV === "production" ? "info" : "debug",
    format: getFormat(label),
    transports: [new winston.transports.Console()],
  });

module.exports = createLogger;
