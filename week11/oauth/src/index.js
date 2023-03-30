"use strict";

require("dotenv/config");
const express = require("express");
const MongoStore = require("connect-mongo");
const morgan = require("morgan");
const passport = require("passport");
const session = require("express-session");

const authRouter = require("./router/auth");
const isAuthenticated = require("./middleware/isAuthenticated");

require("./util/db");

const app = express();

app.use(express.json());
app.use(morgan("tiny"));

// app.use((req, res, next) => {
//   console.log("1", req.user, req.session, req.logout);
//   return next()
// });

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
    }),
  })
);
// app.use((req, res, next) => {
//   console.log("2", req.user, req.session, req.logout);
//   return next()
// });

app.use(passport.initialize());
// app.use((req, res, next) => {
//   console.log("3", req.user, req.session, req.logout);
//   return next()
// });
app.use(passport.session());
// app.use((req, res, next) => {
//   console.log("4", req.user, req.session, req.logout);
//   return next()
// });

app.use((req, res, next) => {
  console.log(req.user);
  next();
});

app.get("/", (_req, res) => {
  res.send("server running");
});

app.use("/auth", authRouter);

app.get("/public", (_req, res) => {
  res.send("Anyone can see this");
});

app.get("/private", isAuthenticated, (_req, res) => {
  res.send("If you can see this, you are logged in");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
