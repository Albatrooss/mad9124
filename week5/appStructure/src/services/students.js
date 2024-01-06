const createDebug = require("debug");
const { BadRequestError, NotFoundError } = require("../utils/errors");
const debug = createDebug("app:studentService");

const students = [
  { id: "1", name: "tim", grade: "A+" },
  { id: "2", name: "jad", grade: "A+" },
  { id: "3", name: "hena", grade: "A+" },
  { id: "4", name: "eduardo", grade: "A+" },
];

const create = (name, grade) => {
  const id = parseInt(students[students.length - 1].id, 10) + 1;

  if (!name || !grade) {
    throw new BadRequestError("Name and grade required");
  }
  const newStudent = {
    id: id.toString(),
    name,
    grade,
  };
  students.push(newStudent);
  return newStudent;
};

const deleteOne = (id) => {
  const idx = students.findIndex((student) => student.id === id);

  if (idx < 0) {
    throw new NotFoundError(`Student with id ${id} not found`);
  }

  const [deletedStudent] = students.splice(idx, 1);
  return deletedStudent;
};

const getAll = () => {
  return students;
};

const getOne = (id) => {
  const student = students.find((student) => student.id === id);

  if (!student) {
    throw new NotFoundError(`Student with id ${id} not found`);
  }

  return student;
};

const replace = (id, name, grade) => {
  const updatedStudent = {
    id,
    name,
    grade,
  };

  if (!name || !grade) {
    throw new BadRequestError("Name and Grade required");
  }

  const idx = students.findIndex((student) => student.id === id);

  if (idx < 0) {
    throw new NotFoundError(`Student with id ${id} not found`);
  }

  students[idx] = updatedStudent;
  return updatedStudent;
};

const update = (id, updatedFields) => {
  // Object.keys returns an array of all the keys of the object
  if (!Object.keys(updatedFields).length) {
    throw new BadRequestError("Nothing updated");
  }

  const idx = students.findIndex((student) => student.id === id);

  if (idx < 0) {
    throw new NotFoundError(`Student with id ${id} not found`);
  }

  const updatedStudent = {
    ...students[idx],
    ...updatedFields,
  };

  students[idx] = updatedStudent;
  return updatedStudent;
};

module.exports = {
  create,
  deleteOne,
  getAll,
  getOne,
  replace,
  update,
};
