"use strict";

require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const { errorHandler } = require("./utils/errors");

const app = express();

app.use(express.json());
app.use(morgan("tiny"));

app.get("/", (_req, res) => {
  res.send("Server running :)");
});

// routers
app.use("/api/pokemon", pokemonRouter);
app.use("/api/trainer", trainerRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
