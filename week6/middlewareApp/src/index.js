"use strict";

const path = require("path");
const express = require("express");
const morgan = require("morgan");
const multer = require("multer");
const studentRouter = require("./router/students");
const classesRouter = require("./router/classes");
const isAuthenticated = require("./middleware/isAuthenticated");
const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

app.use(express.json());
// app.use(express.urlencoded());
app.use(express.static("public"));

// app.use(morgan("tiny"));
// Morgan tiny clone
app.use((req, res, next) => {
  const startTime = Date.now();
  res.on("finish", () => {
    const endTime = Date.now();
    console.log(
      `${req.method} ${req.originalUrl} ${res.statusCode} - ${
        endTime - startTime
      }ms`
    );
  });
  next();
});

app.post("/test", (req, res) => {
  console.log(req.body);
  res.json({ some: "thing" });
});

app.post("/upload/profilePic", upload.single("image"), (req, res) => {
  console.log("file", req.file);
  res.json({
    message: "image uploaded",
    image: `uploads/${req.file?.filename}`,
  });
});

app.post("/upload/album", upload.array("images", 4), (req, res) => {
  console.log("files", req.files);
  res.json({
    message: "image uploaded",
  });
});

app.use("/students", studentRouter);
app.use("/classes", classesRouter);

app.listen(3000, () => {
  console.log("App listening on port 3000");
});
