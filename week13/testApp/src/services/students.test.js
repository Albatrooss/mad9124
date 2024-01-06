"use strict";

const { ObjectId } = require("mongodb");

const Student = require("../models/student");
const StudentService = require("./students");
const { NotFoundError, BadRequestError } = require("../utils/errors");

// this replaces Student with the jest mock object
jest.mock("../models/student");

describe("StudentService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe("#getAll", () => {
    it("should call Student.find and return the result", async () => {
      // Arrange
      const EXPECTED = {
        _id: new ObjectId(),
        name: "tim",
        grade: "A+",
      };
      Student.find.mockResolvedValue([EXPECTED]);
      // Act
      const result = await StudentService.getAll();

      // Assert
      expect(Student.find.mock.calls.length).toBe(1);
      expect(result).toStrictEqual([EXPECTED]);
    });
  });
  describe("#getOne", () => {
    it("happy path", async () => {
      // Arrange
      const _id = new ObjectId();
      const id = _id.toString();
      const EXPECTED = {
        _id,
        name: "will",
        grade: "b-",
      };
      Student.findById.mockResolvedValue(EXPECTED);

      // Act
      const result = await StudentService.getOne(id);

      // Assert
      expect(Student.findById).toBeCalledWith(id);
      expect(Student.findById.mock.calls.length).toBe(1);
      expect(result).toStrictEqual(EXPECTED);
    });
    it("should throw 404 error if no student found", async () => {
      // Arrange
      const id = new ObjectId().toString();
      Student.findById.mockResolvedValue(null);

      // Act
      // Assert
      await expect(StudentService.getOne(id)).rejects.toThrow(
        `Student with id ${id} not found`
      );
    });
  });
  describe("#create", () => {
    it("happy path", async () => {
      // Arrange
      const input = {
        name: "lizzie",
        grade: "A+",
      };

      // Act
      const result = await StudentService.create(input);

      // Assert
      expect(Student).toBeCalledWith(input);
      expect(Student.prototype.save).toBeCalledWith();
      expect(Student.prototype.save.mock.calls.length).toBe(1);
      expect(result).toBeInstanceOf(Student);
    });
  });
  describe("#replace", () => {
    it("happy path", async () => {
      // Arrange
      const _id = new ObjectId();
      const id = _id.toString();
      const newStudentData = {
        name: "teagan",
        grade: "A+",
      };
      const EXPECTED = {
        _id,
        ...newStudentData,
      };
      Student.findByIdAndUpdate.mockResolvedValue(EXPECTED);

      // Act
      const result = await StudentService.replace(id, newStudentData);

      // Assert
      expect(Student.findByIdAndUpdate).toBeCalledWith(id, newStudentData, {
        returnOriginal: false,
      });
      expect(Student.findByIdAndUpdate.mock.calls.length).toBe(1);
      expect(result).toStrictEqual(EXPECTED);
    });
    it("should throw 400", async () => {
      // Arrange
      const _id = new ObjectId();
      const id = _id.toString();
      const newStudentData = {
        name: "teagan",
      };

      // Act
      // Assert
      await expect(StudentService.replace(id, newStudentData)).rejects.toThrow(
        `Name and Grade required`
      );
    });
    it("should throw 404", async () => {
      // Arrange
      const _id = new ObjectId();
      const id = _id.toString();
      const newStudentData = {
        name: "teagan",
        grade: "A+",
      };
      Student.findByIdAndUpdate.mockResolvedValue(null);

      // Act
      // Assert
      await expect(StudentService.replace(id, newStudentData)).rejects.toThrow(
        `Student with id ${id} not found`
      );
    });
  });
  describe("#update", () => {
    it("happy path", async () => {
      // Arrange
      const _id = new ObjectId();
      const id = _id.toString();
      const newStudentData = {
        name: "teagan",
        grade: "A+",
      };
      const EXPECTED = {
        _id,
        ...newStudentData,
      };
      Student.findByIdAndUpdate.mockResolvedValue(EXPECTED);

      // Act
      const result = await StudentService.update(id, newStudentData);

      // Assert
      expect(Student.findByIdAndUpdate).toBeCalledWith(id, newStudentData, {
        returnOriginal: false,
      });
      expect(Student.findByIdAndUpdate.mock.calls.length).toBe(1);
      expect(result).toStrictEqual(EXPECTED);
    });
    it("should throw 400", async () => {
      // Arrange
      const _id = new ObjectId();
      const id = _id.toString();
      const newStudentData = {};

      // Act
      // Assert
      await expect(StudentService.update(id, newStudentData)).rejects.toThrow(
        "No changes given"
      );
    });
    it("should throw 404", async () => {
      // Arrange
      const _id = new ObjectId();
      const id = _id.toString();
      const newStudentData = {
        name: "teagan",
        grade: "A+",
      };
      Student.findByIdAndUpdate.mockResolvedValue(null);

      // Act
      // Assert
      await expect(StudentService.update(id, newStudentData)).rejects.toThrow(
        `Student with id ${id} not found`
      );
    });
  });
  describe("#deleteOne", () => {
    it("happy path", async () => {
        // Arrange
        const _id = new ObjectId();
        const id = _id.toString();
        const EXPECTED = {
          _id,
          name: "teagan",
          grade: "A+",
        };
        Student.findByIdAndDelete.mockResolvedValue(EXPECTED);
  
        // Act
        const result = await StudentService.deleteOne(id);
  
        // Assert
        expect(Student.findByIdAndDelete).toBeCalledWith(id);
        expect(Student.findByIdAndDelete.mock.calls.length).toBe(1);
        expect(result).toStrictEqual(EXPECTED);
      });
      it("should throw 404", async () => {
        // Arrange
        const id = new ObjectId().toString();
        Student.findByIdAndDelete.mockResolvedValue(null);
  
        // Act
        // Assert
        await expect(StudentService.deleteOne(id)).rejects.toThrow(
          `Student with id ${id} not found`
        );
      });
  });
});
