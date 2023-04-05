function addTwoNumbers(x, y) {
  return x + y;
}

function combineTwoObjects(obj1, obj2) {
  return {
    ...obj1,
    ...obj2,
  };
}

function pretendToSaveToMongo(obj) {
  return {
    _id: Math.random(),
    ...obj,
  };
}

module.exports = {
  addTwoNumbers,
  combineTwoObjects,
  pretendToSaveToMongo,
};
