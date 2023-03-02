const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send(`Hello world from ${process.env.NODE_ENV} environment!`);
});

app.get("/api", (req, res) => {
  const data = { message: "Hello world from Express!" };
  res.json({
    data,
  });
});

app.get("/tim", (req, res) => {
  const data = { message: "Hello Tim!" };
  res.json({
    data,
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
