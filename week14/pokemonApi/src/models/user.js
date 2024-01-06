"use strict";

const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    googleId: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.set("toObject", {
  transform: (_doc, ret) => ({
    ...ret,
    id: ret._id.toString(),
  }),
});

module.exports = model("user", userSchema);
