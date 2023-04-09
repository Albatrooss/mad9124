// 1 test
const addTwoNumbers = (x, y) => x + y;
// 1 test
const subtractTwoNumbers = (x, y) => x - y;
// 1 test
const combineTwoObjects = (objA, objB) => ({ ...objA, ...objB });

// 4 tests
const doSomethingByType = type => {
  if (type === 'potato') {
    return 'A';
  }
  if (type === 'salad') {
    return 'B';
  }
  if (type === 'error') {
    throw new Error('error');
  }
  return 'C';
};

module.exports = {
  addTwoNumbers,
  combineTwoObjects,
  doSomethingByType,
  subtractTwoNumbers,
};
