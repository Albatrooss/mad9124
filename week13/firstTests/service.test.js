function add(x, y) {
  return x + y;
}

function combineObjects(obj1, obj2) {
  return {
    ...obj1,
    ...obj2,
  };
}

function mockMongoCreate(input) {
  return {
    _id: Math.random(),
    ...input,
  };
}

test("should add to numbers together", () => {
  const result = add(1, 2);
  expect(result).toBe(3);
});

test("should combine the objects together", () => {
  const result = combineObjects({ name: "tim" }, { grade: "A+" });
  expect(result).toEqual({
    name: "tim",
    grade: "A+",
  });
});

test("should match the input", () => {
  const result = mockMongoCreate({ name: "tim", grade: "A+" });
  expect(result).toMatchObject({ name: "tim", grade: "A+" });
});
