"use strict";

const Pokemon = require("../models/pokemon");

const create = async (pokemonId, abilityData) => {
  const updatedPokemon = await Pokemon.findByIdAndUpdate(
    pokemonId,
    {
      $addToSet: {
        abilities: abilityData,
      },
    },
    {
      returnOriginal: false,
      runValidators: true,
    }
  );
  return updatedPokemon.abilities[updatedPokemon.abilities.length - 1];
};

const update = async (pokemonId, abilityId, abilityData) => {
  /**{
   * name: tim
   * damage: 0
   * }
   * [['name', 'tim'], ['damage', 9]]
   * */

  const updateObj = Object.entries(abilityData).reduce((acc, [key, val]) => {
    acc[`abilities.$.${key}`] = val;
    return acc;
  }, {});

  const updatedPokemon = await Pokemon.findOneAndUpdate(
    {
      _id: pokemonId,
      "abilities._id": abilityId,
    },
    {
      $set: updateObj,
    },
    {
      returnOriginal: false,
      runValidators: true,
    }
  );

  return updatedPokemon.abilities.find(
    (ability) => ability._id.toString() === abilityId
  );
};

module.exports = {
  create,
  update,
};
