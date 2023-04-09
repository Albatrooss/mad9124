"use strict";

const { Router } = require("express");
const PokemonController = require("../controllers/pokemon");
const isAuthenticated = require("../middleware/isAuthenticated");

const pokemonRouter = Router();

// public routes
pokemonRouter.get("/", PokemonController.getAll);
pokemonRouter.get("/:id", PokemonController.getOne);

// private routes
pokemonRouter.use(isAuthenticated);
pokemonRouter.post("/", PokemonController.create);
pokemonRouter.put("/:id", PokemonController.replace);
pokemonRouter.patch("/:id", PokemonController.update);
pokemonRouter.delete("/:id", PokemonController.deleteOne);

module.exports = pokemonRouter;
