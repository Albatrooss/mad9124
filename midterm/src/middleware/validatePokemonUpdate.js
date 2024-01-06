const { BadRequestError } = require("../utils/errors");

const validatePokemonUpdate = (req, _res, next) => {
  const { name, type, abilities } = req.body;

  // re assign req.body to only include the values we want
  req.body = {
    ...(name && { name }),
    ...(type && { type }),
    ...(abilities && { abilities }),
  };

  if (name && typeof name !== "string") {
    throw new BadRequestError("Name must be a string");
  }
  if (type && typeof type !== "string") {
    throw new BadRequestError("Type must be a string");
  }
  if (abilities === null) {
    delete req.body.abilities;
  } else if (typeof abilities === "string") {
    req.body.abilities = [abilities];
  } else if (Array.isArray(abilities)) {
    if (abilities.some((ability) => typeof ability !== "string")) {
      throw new BadRequestError("Abilities must be a string array");
    }
  } else if (abilities) {
    throw new BadRequestError("Abilities must be a string array");
  }
  return next();
};

module.exports = validatePokemonUpdate;
