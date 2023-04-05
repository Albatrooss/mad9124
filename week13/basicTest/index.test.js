const { addTwoNumbers, combineTwoObjects, pretendToSaveToMongo } = require(".");

test("Should add 2 numbers together", () => {
  const result = addTwoNumbers(1, 2);
  expect(result).toBe(3);
});

test("Should combine 2 objects", () => {
  const result = combineTwoObjects({ name: "tim" }, { grade: "A-" });
  expect(result).toStrictEqual({
    name: "tim",
    grade: "A-",
  });
});

test("Should save to mongo", () => {
  const result = pretendToSaveToMongo({ name: "tim", grade: "A-" });
  expect(result).toMatchObject({
    name: "tim",
    grade: "A-",
  });
});
