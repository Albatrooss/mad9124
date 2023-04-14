"use strict";

const AbilityService = require("../services/ability");

const create = async (req, res, next) => {
  try {
    const createdAbility = await AbilityService.create(
      req.params.id,
      req.sanitizedBody
    );

    res.status(201).json({ data: createdAbility });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const updatedAbility = await AbilityService.update(
      req.params.id,
      req.params.abilityId,
      req.sanitizedBody
    );
    res.json({ data: updatedAbility });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  update,
};
