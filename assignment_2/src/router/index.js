"use strict";

const { Router } = require("express");
const pokemonRouter = require("./pokemon");

const router = Router();

router.use("/pokemon", pokemonRouter);

module.exports = router;
