"use strict";

const xss = require("xss");

/**
 * const obj = {
 * id: '1',
 * name: 'tim',
 * grade: 'A',
 * }
 * id = '1',
 * _id = undefined
 * attributes = {
 * name: 'tim',
 * grade: 'A'
 * settings: {}
 * }
 */
// {'0': {name: 'mad9124'}}

const sanitizeValue = (value) => {
  if (value instanceof Array) {
    return value.map(sanitizeValue);
  }
  if (value instanceof Object) {
    return stripTags(value);
  }
  if (typeof value === "string") {
    return xss(value, {
      whiteList: {}, // empty, means filter out all tags
      stripIgnoreTag: true, // filter out all HTML not in the whitelist
      stripIgnoreTagBody: ["script"],
      // the script tag is a special case, we need
      // to filter out its content
    });
  }
  return value;
};

const stripTags = (payload) => {
  const attributes = { ...payload };
  for (const key in attributes) {
    attributes[key] = sanitizeValue(attributes[key]);
  }
  return attributes;
};

const sanitizeBody = (req, res, next) => {
  // dont trust the client ids, so strip them away
  const { id, _id, ...attributes } = req.body;

  req.sanitizedBody = stripTags(attributes);

  return next();
};

module.exports = sanitizeBody;
