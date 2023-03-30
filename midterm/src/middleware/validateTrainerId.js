const trainers = require("../models/trainers");
const { NotFoundError } = require("../utils/errors");

const validateTrainerId = (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  const idx = trainers.findIndex((trainer) => trainer.id === id);
  if (idx < 0) {
    throw new NotFoundError(`Trainer with id ${id} not found.`);
  }
  return next();
};

module.exports = validateTrainerId;
