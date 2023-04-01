const StudentService = require("../services/students");

const getAll = async (_req, res, next) => {
  try {
    const data = await StudentService.getAll();
    res.json({ data });
  } catch (error) {
    next(error);
  }
};

const getOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await StudentService.getOne(id);
    res.json({ data });
  } catch (error) {
    console.log("e", error);
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const { name, grade } = req.body;
    const data = await StudentService.create(name, grade);
    res.status(201).json({ data });
  } catch (error) {
    next(error);
  }
};

const replace = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await StudentService.replace(id, req.body);
    res.json({ data });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedFields = req.body;
    const data = await StudentService.update(id, updatedFields);

    res.json({ data });
  } catch (error) {
    next(error);
  }
};

const deleteOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedStudent = await StudentService.deleteOne(id);
    res.json({ data: deletedStudent });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getOne,
  create,
  replace,
  update,
  deleteOne,
};
