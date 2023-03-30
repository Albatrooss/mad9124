"use strict";

require("dotenv/config");
const express = require("express");
const morgan = require("morgan");
const router = require("./router");
const {errorHandler} = require("./utils/errors");

const app = express();

app.use(express.json());
app.use(morgan("tiny"));

app.use("/api", router);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
