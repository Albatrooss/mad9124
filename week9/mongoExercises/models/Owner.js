"use strict";
const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const ownerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  dogs: [
    {
      type: ObjectId,
      ref: "dog",
    },
  ],
});

module.exports = mongoose.model("owner", ownerSchema);
