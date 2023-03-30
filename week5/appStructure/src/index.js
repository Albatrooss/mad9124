"use strict";

require("dotenv/config");
const express = require("express");
const morgan = require("morgan");
const studentRouter = require("./router/students");
const { errorHandler, ForbiddenError } = require("./utils/errors");

const app = express();

app.use(morgan("tiny"));
app.use(express.json());
app.use((req, res, next) => {
  console.log("user 1", req.user);
  req.user = {
    id: 1,
    name: "tim",
    role: "USER",
  };
  next();
});
app.use((req, res, next) => {
  if (req.user.role !== "ADMIN") {
    throw new ForbiddenError(" Must to be an admin to access this page");
  }
  return next();
});

app.use("/students", studentRouter);

// Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
