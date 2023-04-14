const { Schema, model, Types } = require("mongoose");

const pokemonSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  abilities: [
    {
      type: String,
    },
  ],
  ownerId: {
    type: Types.ObjectId,
    require: true,
    ref: 'user'
  }
});

module.exports = model("pokemon", pokemonSchema);
