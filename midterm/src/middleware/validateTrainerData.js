const { BadRequestError } = require("../utils/errors");

const validateTrainerData = (req, _res, next) => {
  const { firstName, lastName, badges } = req.body;
  
  if (!firstName || !lastName || !badges) {
    throw new BadRequestError("First Name, Last Name and Badges are required");
  }
  if (typeof firstName !== "string") {
    throw new BadRequestError("First Name must be a string");
  }
  if (typeof lastName !== "string") {
    throw new BadRequestError("Last Name must be a string");
  }
  if (typeof badges === "string") {
    req.body.badges = [badges];
  } else if (Array.isArray(badges)) {
    if (badges.some((badge) => typeof badge !== "string")) {
      throw new BadRequestError("Badges must be a string array");
    }
  } else {
    throw new BadRequestError("Badges must be a string array");
  }
  return next();
};

module.exports = validateTrainerData;
