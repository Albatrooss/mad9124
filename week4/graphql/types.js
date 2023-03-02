"use strict";

const {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
} = require("graphql");
const classes = require("./data/classes");

const ClassType = new GraphQLObjectType({
  name: "ClassType",
  fields: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    instructor: { type: new GraphQLNonNull(GraphQLString) },
  },
});

const StudentType = new GraphQLObjectType({
  name: "StudentType",
  fields: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    grade: { type: new GraphQLNonNull(GraphQLString) },
    classes: {
      type: new GraphQLList(ClassType),
      resolve: async ({ id }) => {
        console.log("Waiting for expensive query.");
        await new Promise((res) => setTimeout(res, 3000));
        return classes.filter((cls) => cls.students.includes(id));
      },
    },
  },
});

module.exports = { ClassType, StudentType };
