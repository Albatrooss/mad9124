"use strict";

const { NotFoundError, BadRequestError } = require("../utils/errors");

const Student = require("../models/student");

const getAll = async () => {
  const students = await Student.find();
  return students;
};

const getOne = async (id) => {
  const student = await Student.findById(id);
  if (!student) {
    throw new NotFoundError(`Student with id ${id} not found`);
  }
  return student;
};

const create = async (studentData) => {
  const newStudent = new Student(studentData);
  await newStudent.save();
  return newStudent;
};

const replace = async (id, newStudentData) => {
  if (!newStudentData.name || !newStudentData.grade) {
    throw new BadRequestError("Name and Grade required");
  }

  const updatedStudent = await Student.findByIdAndUpdate(id, newStudentData, {
    returnOriginal: false,
  });

  if (!updatedStudent) {
    throw new NotFoundError(`Student with id ${id} not found`);
  }

  return updatedStudent;
};

const update = async (id, updatedFields) => {
  if (!Object.keys(updatedFields).length) {
    throw new BadRequestError("No changes given");
  }

  const updatedStudent = await Student.findByIdAndUpdate(id, updatedFields, {
    returnOriginal: false,
  });

  if (!updatedStudent) {
    throw new NotFoundError(`Student with id ${id} not found`);
  }

  return updatedStudent;
};

const deleteOne = async (id) => {
  // const deletedStudent = await Student.findByIdAndRemove(id);
  const deletedStudent = await Student.findByIdAndDelete(id);

  if (!deletedStudent) {
    throw new NotFoundError(`Student with id ${id} not found`);
  }

  return deletedStudent;
};

module.exports = {
  getAll,
  getOne,
  create,
  replace,
  update,
  deleteOne,
};
