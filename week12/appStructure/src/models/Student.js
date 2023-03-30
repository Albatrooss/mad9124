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
    settings: {
      videoOff: {
        type: Boolean,
        default: false,
      },
      plan: {
        type: String,
        enum: ["free", "tier_1", "tier_2"],
        default: "free",
      },
    },
    courses: [
      {
        name: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = model("student", studentSchema);
