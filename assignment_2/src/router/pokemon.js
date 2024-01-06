"use strict";

const { Router } = require("express");
const PokemonController = require("../controllers/pokemon");

const pokemonRouter = Router();

pokemonRouter.get("/", PokemonController.getAll);
pokemonRouter.get("/:id", PokemonController.getOne);
pokemonRouter.post("/", PokemonController.create);
pokemonRouter.put("/:id", PokemonController.replace);
pokemonRouter.patch("/:id", PokemonController.update);
pokemonRouter.delete("/:id", PokemonController.deleteOne);

module.exports = pokemonRouter;
