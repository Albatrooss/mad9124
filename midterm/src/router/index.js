"use strict";

const { Router } = require("express");
const pokemonRouter = require("./pokemon");
const trainerRouter = require("./trainer");

const router = Router();

router.use("/pokemon", pokemonRouter);
router.use("/trainer", trainerRouter);

module.exports = router;
