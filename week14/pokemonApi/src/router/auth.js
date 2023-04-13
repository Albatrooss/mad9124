"use strict";

const { Router } = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");

require("../utils/passport");

const authRouter = Router();

// this redirects to google
authRouter.get("/google", (req, res, next) => {
  // get the redirect_url from the query params
  // expecting the url to look like /auth/google?redirect_url=http://localhost:3000/
  const { redirect_url } = req.query;

  // add it to the google state
  const authenticator = passport.authenticate("google", {
    scope: ["profile"],
    state: redirect_url,
  });

  // redirect to google.
  authenticator(req, res, next);
});

// google sends response to this
authRouter.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    // get the state from the query params
    const { state } = req.query;

    // define the redirectUrl with a fallback if undefined
    const redirectUrl = state ?? "/api/pokemon";

    // get the user id
    const id = req.user._id.toString();
    // generate the token
    const token = jwt.sign({ id }, process.env.JWT_SECRET);

    // redirect with the token
    res.redirect(`${redirectUrl}?token=${token}`);
  }
);

authRouter.get("/logout", (req, res) => {
  req.logout({}, () => {
    res.redirect("/");
  });
});

module.exports = authRouter;
