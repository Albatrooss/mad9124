"use strict";

const { GraphQLObjectType, GraphQLNonNull, GraphQLString } = require("graphql");
const students = require("./data/students");
const { StudentType } = require("./types");

const createStudent = {
  type: StudentType,
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    grade: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: (_source, { name, grade }) => {
    const id = parseInt(students[students.length - 1].id, 10) + 1;
    const newStudent = {
      id: id.toString(),
      name,
      grade,
    };
    students.push(newStudent);
    return newStudent;
  },
};

const deleteStudent = {
  type: StudentType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: (_source, { id }) => {
    const idx = students.findIndex((student) => student.id === id);
    if (idx < 0) throw new Error(`Student with id ${id} not found`);

    const [deletedStudent] = students.splice(idx, 1);
    return deletedStudent;
  },
};

const updateStudent = {
  type: StudentType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: GraphQLString },
    grade: { type: GraphQLString },
  },
  resolve: (_source, { id, ...rest }) => {
    const idx = students.findIndex((student) => student.id === id);
    if (idx < 0) throw new Error(`Student with id ${id} not found`);

    Object.assign(students[idx], rest);

    return students[idx];
  },
};

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createStudent,
    updateStudent,
    deleteStudent,
  },
});

module.exports = mutation;
