const { Schema, model, Types } = require("mongoose");

const abilitySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    damage: {
      type: Number,
      min: 1,
      max: 10,
      default: 5,
    },
  },
  {
    timestamps: true,
  }
);

const pokemonSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  abilities: [abilitySchema],
  ownerId: {
    type: Types.ObjectId,
    require: true,
    ref: "user",
  },
});

pokemonSchema.set("toObject", {
  transform: (_doc, ret) => ({
    ...ret,
    id: ret._id.toString(),
  }),
});

module.exports = model("pokemon", pokemonSchema);
