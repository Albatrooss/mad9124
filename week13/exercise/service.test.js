"use strict";

const {
  addTwoNumbers,
  combineTwoObjects,
  doSomethingByType,
  subtractTwoNumbers,
} = require("./service");

describe("Service", () => {
  describe("addTwoNumbers", () => {
    it("should add the numbers together", () => {
      const result = addTwoNumbers(1, 2);
      expect(result).toBe(3);
    });
  });
  describe("doSomethingByType", () => {
    it("should throw an eror", () => {
      expect(() => doSomethingByType("error")).toThrow(`error`);
    });
  });
});
