"use strict";

const { Router } = require("express");
const passport = require("passport");
require("../utils/passport");

const authRouter = Router();

// we will hit this route to login
// will redirect us to google
authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile"] })
);

// google will hit this route after we sign in
authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/",
  }),
  (_req, res) => {
    res.redirect("/private");
  }
);

authRouter.get("/logout", (req, res) => {
  req.logout({}, () => {
    res.redirect("/");
  });
});

module.exports = authRouter;
