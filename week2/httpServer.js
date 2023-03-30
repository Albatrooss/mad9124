"use strict";
const { createServer } = require("http");

const server = createServer((req, res) => {
  if (req.url === "/api") {
    const data = { message: "Hello world from Node.js!" };
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.write(JSON.stringify({ data }));
    res.end();
  } else if (req.url === "/tim") {
    const data = { message: "HelloTim!" };
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.write(JSON.stringify({ data }));
    res.end();
  } else {
    res.write("Hello world from Node.js!");
    res.end();
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server running on port ${PORT}!`);
});
