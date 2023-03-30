"use strict";

const { Router } = require("express");
const PokemonController = require("../controllers/pokemon");
const validatePokemonData = require("../middleware/validatePokemonData");
const validatePokemonId = require("../middleware/validatePokemonId");
const validatePokemonUpdate = require("../middleware/validatePokemonUpdate");

const pokemonRouter = Router();

pokemonRouter.get("/", PokemonController.getAll);
pokemonRouter.get("/:id", validatePokemonId, PokemonController.getOne);
pokemonRouter.post("/", validatePokemonData, PokemonController.create);
pokemonRouter.put(
  "/:id",
  validatePokemonId,
  validatePokemonData,
  PokemonController.replace
);
pokemonRouter.patch(
  "/:id",
  validatePokemonId,
  validatePokemonUpdate,
  PokemonController.update
);
pokemonRouter.delete("/:id", validatePokemonId, PokemonController.deleteOne);

module.exports = pokemonRouter;
