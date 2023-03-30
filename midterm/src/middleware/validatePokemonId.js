const pokemon = require("../models/pokemon");
const { NotFoundError } = require("../utils/errors");

const validatePokemonId = (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  const idx = pokemon.findIndex((p) => p.id === id);
  if (idx < 0) {
    throw new NotFoundError(`Pokemon with id ${id} not found.`);
  }
  return next();
};

module.exports = validatePokemonId;
