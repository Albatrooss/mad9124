"use strict";

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const User = require("../models/User");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK,
    },
    async function (_accessToken, _refreshToken, profile, cb) {
      try {
        const user = await User.findOneAndUpdate(
          {
            googleId: profile.id,
          },
          {
            $set: {
              fullName: profile.displayName,
              googleId: profile.id,
            },
          },
          {
            upsert: true,
            returnDocument: "after",
          }
        );
        cb(null, user);
      } catch (error) {
        cb(error);
      }
    }
  )
);

// save the entire user in the session
// passport.serializeUser((user, done) => {
//   done(null, user);
// });

// passport.deserializeUser(async (user, done) => {
//   done(null, user);
// });

// save only the id in the session
passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
