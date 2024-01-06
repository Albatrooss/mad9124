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
    options: {
      videoOff: {
        type: Boolean,
        default: true,
      },
      tier: {
        type: String,
        default: "basic",
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("student", studentSchema);
