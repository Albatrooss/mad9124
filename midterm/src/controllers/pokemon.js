const PokemonService = require("../services/pokemon");

const getAll = (_req, res) => {
  const pokemon = PokemonService.getAll();
  res.json({ data: pokemon });
};

const getOne = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const pokemon = PokemonService.getOne(id);
  res.json({ data: pokemon });
};

const create = (req, res) => {
  const { name, type, abilities } = req.body;
  const createdPokemon = PokemonService.create(name, type, abilities);
  res.status(201).json({ data: createdPokemon });
};

const replace = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const replacedPokemon = PokemonService.replace(id, req.body);
  res.json({ data: replacedPokemon });
};

const update = (req, res) => {
  const id = parseInt(req.params.id, 10);

  const updatedPokemon = PokemonService.update(id, req.body);

  res.json({ data: updatedPokemon });
};

const deleteOne = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const deletedpokemon = PokemonService.deleteOne(id);
  res.json({ data: deletedpokemon });
};

module.exports = {
  getAll,
  getOne,
  create,
  replace,
  update,
  deleteOne,
};
