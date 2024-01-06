const { BadRequestError } = require("../utils/errors");

const validatePokemonData = (req, _res, next) => {
  const { name, type, abilities } = req.body;

  if (!name || !type || !abilities) {
    throw new BadRequestError("Name, Type and Abilities are required");
  }
  if (typeof name !== "string") {
    throw new BadRequestError("Name must be a string");
  }
  if (typeof type !== "string") {
    throw new BadRequestError("Type must be a string");
  }
  if (typeof abilities === "string") {
    req.body.abilities = [abilities];
  } else if (Array.isArray(abilities)) {
    if (abilities.some((ability) => typeof ability !== "string")) {
      throw new BadRequestError("Abilities must be a string array");
    }
  } else {
    throw new BadRequestError("Abilities must be a string array");
  }

  return next();
};

module.exports = validatePokemonData;
