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
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const data = await StudentService.create(req.sanitizedBody);
    res.status(201).json({ data });
  } catch (error) {
    next(error);
  }
};

const replace = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await StudentService.replace(id, req.sanitizedBody);
    res.json({ data });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await StudentService.update(id, req.sanitizedBody);

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
