"use strict";

const { Schema, model } = require("mongoose");

const studentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    grade: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("student", studentSchema);
