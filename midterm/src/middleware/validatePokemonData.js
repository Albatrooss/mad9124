const { BadRequestError } = require("../utils/errors");

const validatePokemonData = (req, _res, next) => {
  const { name, type, abilities } = req.body;

  if (!name || !type || !abilities) {
    throw new BadRequestError("Name, Type and Abilities required");
  }

  if (typeof abilities == "string") {
    req.body.abilities = [abilities];
  } else if (!Array.isArray(abilities)) {
    throw new BadRequestError("Abilities should be an array");
  } else if (abilities.some((el) => typeof el !== "string")) {
    throw new BadRequestError("Abilities must be a string");
  }
  next();
};

module.exports = validatePokemonData;
