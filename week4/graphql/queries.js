"use strict";

const { GraphQLNonNull, GraphQLObjectType, GraphQLList, GraphQLString } = require("graphql");
const students = require("./data/students");
const { StudentType } = require('./types');

const getStudent = {
  type: StudentType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: (_source, { id }) => {
    const student = students.find((student) => student.id === id);
    return student;
  },
};

const getStudents = {
  type: new GraphQLList(StudentType),
  resolve: () => students,
};

const query = new GraphQLObjectType({
  name: "Query",
  fields: {
    student: getStudent,
    students: getStudents,
  },
});

module.exports = query;
