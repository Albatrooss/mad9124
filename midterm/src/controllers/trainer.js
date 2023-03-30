const TrainerService = require("../services/trainer");

const getAll = (_req, res) => {
  const trainer = TrainerService.getAll();
  res.json({ data: trainer });
};

const getOne = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const trainer = TrainerService.getOne(id);
  res.json({ data: trainer });
};

const create = (req, res) => {
  const { firstName, lastName, role, badges } = req.body;
  const createdTrainer = TrainerService.create(
    firstName,
    lastName,
    role,
    badges
  );
  res.status(201).json({ data: createdTrainer });
};

const replace = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const replacedTrainer = TrainerService.replace(id, req.body);
  res.json({ data: replacedTrainer });
};

const update = (req, res) => {
  const id = parseInt(req.params.id, 10);

  const updatedTrainer = TrainerService.update(id, req.body);

  res.json({ data: updatedTrainer });
};

const deleteOne = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const deletedTrainer = TrainerService.deleteOne(id);
  res.json({ data: deletedTrainer });
};

module.exports = {
  getAll,
  getOne,
  create,
  replace,
  update,
  deleteOne,
};
