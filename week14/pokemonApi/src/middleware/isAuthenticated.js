"use strict";

const jwt = require("jsonwebtoken");

const User = require("../models/user");
const { UnauthorizedError } = require("../utils/errors");
const { NotFoundError } = require("../utils/errors");

const isAuthenticated = async (req, res, next) => {
  // get the token from the headers
  const rawToken = req.headers.authorization;
  const token = rawToken?.replace("Bearer ", "");

  try {
    // verify the token
    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    // look up the user
    const user = await User.findById(id);
    if (!user) {
      throw new NotFoundError(`User with id ${id} not found`);
    }

    // attach user to request
    req.user = user;
    next();
  } catch (error) {
    next(new UnauthorizedError(error.message));
  }
};

module.exports = isAuthenticated;
