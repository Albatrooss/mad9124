"use strict";

const trainers = require("../models/trainers");

const getAll = () => {
  return trainers;
};

const getOne = (id) => {
  const foundTrainer = trainers.find((trainer) => trainer.id === id);
  return foundTrainer;
};

const create = (firstName, lastName, badges, role) => {
  const id = parseInt(trainers[trainers.length - 1].id, 10) + 1;
  const newtrainer = {
    id: id,
    firstName,
    lastName,
    badges,
    role,
  };
  trainers.push(newtrainer);
  return newtrainer;
};

const replace = (id, trainerData) => {
  const replacedTrainer = {
    id,
    ...trainerData,
  };

  const idx = trainers.findIndex((trainer) => trainer.id === id);
  trainers[idx] = replacedTrainer;
  return replacedTrainer;
};

const update = (id, updatedFields) => {
  const idx = trainers.findIndex((p) => p.id === id);

  const updatedTrainer = {
    ...trainers[idx],
    ...updatedFields,
  };

  trainers[idx] = updatedTrainer;
  return updatedTrainer;
};

const deleteOne = (id) => {
  const idx = trainers.findIndex((trainer) => trainer.id === id);

  const [deletedTrainer] = trainers.splice(idx, 1);
  return deletedTrainer;
};

module.exports = {
  getAll,
  getOne,
  create,
  replace,
  update,
  deleteOne,
};
