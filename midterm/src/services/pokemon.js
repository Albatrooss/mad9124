"use strict";

const pokemon = require("../models/pokemon");

const getAll = () => {
  return pokemon;
};

const getOne = (id) => {
  const foundPokemon = pokemon.find((p) => p.id === id);
  return foundPokemon;
};

const create = (name, type, abilities) => {
  const id = parseInt(pokemon[pokemon.length - 1].id, 10) + 1;
  const newPokemon = {
    id: id,
    name,
    type,
    abilities,
  };
  pokemon.push(newPokemon);
  return newPokemon;
};

const replace = (id, pokemonData) => {
  const replacedPokemon = {
    id,
    ...pokemonData,
  };

  const idx = pokemon.findIndex((p) => p.id === id);
  pokemon[idx] = replacedPokemon;
  return replacedPokemon;
};

const update = (id, updatedFields) => {
  const idx = pokemon.findIndex((p) => p.id === id);

  const updatedPokemon = {
    ...pokemon[idx],
    ...updatedFields,
  };

  pokemon[idx] = updatedPokemon;
  return updatedPokemon;
};

const deleteOne = (id) => {
  const idx = pokemon.findIndex((p) => p.id === id);

  const [deletedPokemon] = pokemon.splice(idx, 1);
  return deletedPokemon;
};

module.exports = {
  getAll,
  getOne,
  create,
  replace,
  update,
  deleteOne,
};
