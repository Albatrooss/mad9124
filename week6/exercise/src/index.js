"use strict";

const express = require("express");
const userRouter = require("./router/user");
const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Hello, world!");
});

app.use("/api/user", userRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
