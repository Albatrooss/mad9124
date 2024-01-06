"use strict";
// const os = require("os");
// const path = require("path");
// const queryString = require("querystring");
// const stream = require("stream");
// const http = require("http");
const events = require("events");
const myEventEmitter = new events.EventEmitter();

myEventEmitter.on("event1", (msg) => console.log(msg));

myEventEmitter.emit("event1", "Hooray, we sent an event!");
setTimeout(() => {
  myEventEmitter.emit("event1", "We waited to send this");
}, 3000);

// const server = new http.createServer((request, response) => {
//   let body = "";
//   request.on("data", (data) => {
//     console.log("!", data);
//     body += data;
//   });
//   request.on("error", () => {
//     request.statusCode(400);
//   });
//   request.on("end", () => {
//     const data = JSON.parse(body);
//     response.write(typeof data);
//     response.end();
//   });
// });

// server.listen(4000, () => {
//   console.log("server listening on port 4000");
// });
