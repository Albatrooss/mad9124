const { BadRequestError } = require("../utils/errors");

const validateTrainerUpdate = (req, _res, next) => {
  const { firstName, lastName, badges } = req.body;

  // re assign req.body to only include the values we want
  req.body = {
    ...(firstName && { firstName }),
    ...(lastName && { lastName }),
    ...(badges && { badges }),
  };

  if (firstName && typeof firstName !== "string") {
    throw new BadRequestError("First Name must be a string");
  }
  if (lastName && typeof lastName !== "string") {
    throw new BadRequestError("Last Name must be a string");
  }
  if (badges === null) {
    delete req.body.badges;
  } else if (typeof badges === "string") {
    req.body.badges = [badges];
  } else if (Array.isArray(badges)) {
    if (badges.some((badge) => typeof badge !== "string")) {
      throw new BadRequestError("Badges must be a string array");
    }
  } else if (badges) {
    throw new BadRequestError("Badges must be a string array");
  }
  return next();
};

module.exports = validateTrainerUpdate;
