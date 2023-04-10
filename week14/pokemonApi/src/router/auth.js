"use strict";

const { Router } = require("express");
const jwt = require("jsonwebtoken");
const passport = require("passport");

require("../utils/passport");

const authRouter = Router();

// this redirects to google
authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile"] })
);

// google sends response to this
authRouter.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    // get the user's id
    const id = req.user._id.toString();

    // create the token
    const token = jwt.sign({ id }, process.env.JWT_SECRET);

    //redirect with the token
    res.redirect(`/api/pokemon?token=${token}`);
  }
);

authRouter.get("/logout", (req, res) => {
  req.logout({}, () => {
    res.redirect("/");
  });
});

module.exports = authRouter;
