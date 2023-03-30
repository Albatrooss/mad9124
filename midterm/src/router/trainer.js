"use strict";

const { Router } = require("express");
const TrainerController = require("../controllers/trainer");
const validateTrainerData = require("../middleware/validateTrainerData");
const validateTrainerId = require("../middleware/validateTrainerId");
const validateTrainerUpdate = require('../middleware/validateTrainerUpdate');

const trainerRouter = Router();

trainerRouter.get("/", TrainerController.getAll);
trainerRouter.get("/:id", validateTrainerId, TrainerController.getOne);
trainerRouter.post("/", validateTrainerData, TrainerController.create);
trainerRouter.put(
  "/:id",
  validateTrainerId,
  validateTrainerData,
  TrainerController.replace
);
trainerRouter.patch("/:id", validateTrainerId, validateTrainerUpdate, TrainerController.update);
trainerRouter.delete("/:id", validateTrainerId, TrainerController.deleteOne);

module.exports = trainerRouter;
