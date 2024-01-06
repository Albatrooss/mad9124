const StudentService = require("../services/students");

const getAll = (_, res) => {
  const data = StudentService.getAll();
  res.json({ data });
};

const getOne = (req, res) => {
  const { id } = req.params;

  const data = StudentService.getOne(id);
  res.json({ data });
};

const create = (req, res) => {
  const { name, grade } = req.body;

  const data = StudentService.create(name, grade);
  res.status(201).json({ data });
};

const replace = (req, res) => {
  const { id } = req.params;
  const { name, grade } = req.body;

  const data = StudentService.replace(id, name, grade);
  res.json({ data });
};

const update = (req, res) => {
  const { id } = req.params;
  const updatedFields = req.body;

  const data = StudentService.update(id, updatedFields);

  res.json({ data });
};

const deleteOne = (req, res) => {
  const { id } = req.params;

  const data = StudentService.deleteOne(id);
  res.json({ data });
};

module.exports = {
  getAll,
  getOne,
  create,
  replace,
  update,
  deleteOne,
};
