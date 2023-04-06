"use strict";

const { ObjectId } = require("mongodb");

const Student = require("../models/student");
const StudentService = require("./students");

jest.mock("../models/student");

describe("StudentService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe("#getAll", () => {
    it("should return the correct students", async () => {
      // Arrange
      const EXPECTED = [
        {
          _id: new ObjectId(),
          name: "eduardo",
          grade: "A+",
        },
      ];
      Student.find.mockResolvedValue(EXPECTED);

      // Act
      const result = await StudentService.getAll();

      // Assert
      expect(Student.find.mock.calls.length).toBe(1);
      expect(result).toStrictEqual(EXPECTED);
    });
  });
  describe("#getOne", () => {
    it("happy path", async () => {
      // Arrange
      const _id = new ObjectId();
      const id = _id.toString();
      const EXPECTED = {
        _id,
        name: "eduardo",
        grade: "A+",
      };
      Student.findById.mockResolvedValue(EXPECTED);

      // Act
      const result = await StudentService.getOne(id);

      // Assert
      expect(Student.findById.mock.calls.length).toBe(1);
      expect(Student.findById).toBeCalledWith(id);
      expect(result).toStrictEqual(EXPECTED);
    });
    it("should throw a NotFoundError", async () => {
      // Arrange
      const id = "123412341234";
      Student.findById.mockResolvedValue(null);

      // Act
      // Assert
      await expect(StudentService.getOne(id)).rejects.toThrow(
        `Student with id ${id} not found`
      );

      console.log("calls", Student.findById.mock.calls);
    });
  });
  describe("#create", () => {
    it("happy path", async () => {
      // Arrange
      const input = { name: "bruno", grade: "A+" };

      // Act
      const result = await StudentService.create(input);

      // Assert
      expect(Student).toBeCalledWith(input);
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
        name: "mickey",
        grade: "A+",
      };
      Student.findByIdAndUpdate.mockResolvedValue({
        _id,
        ...newStudentData,
      });

      // Act
      const result = await StudentService.replace(id, newStudentData);

      // Assert
      expect(Student.findByIdAndUpdate.mock.calls.length).toBe(1);
      expect(Student.findByIdAndUpdate).toBeCalledWith(id, newStudentData, {
        returnOriginal: false,
      });
      expect(result).toStrictEqual({
        _id,
        ...newStudentData,
      });
    });
    it("should throw BadRequestError", async () => {
      // Arrange
      const _id = new ObjectId();
      const id = _id.toString();
      const newStudentData = {
        name: "mickey",
      };
      Student.findByIdAndUpdate.mockResolvedValue({
        _id,
        ...newStudentData,
      });

      // Act
      // Assert
      await expect(StudentService.replace(id, newStudentData)).rejects.toThrow(
        "Name and Grade required"
      );
      expect(Student.findByIdAndUpdate.mock.calls.length).toBe(0);
    });
    it("should throw NotFoundError", async () => {
      // Arrange
      const _id = new ObjectId();
      const id = _id.toString();
      const newStudentData = {
        name: "samatar",
        grade: "A+",
      };
      Student.findByIdAndUpdate.mockResolvedValue(null);

      // Act
      // Assert
      await expect(StudentService.replace(id, newStudentData)).rejects.toThrow(
        `Student with id ${id} not found`
      );
      expect(Student.findByIdAndUpdate).toBeCalledWith(id, newStudentData, {
        returnOriginal: false,
      });
      expect(Student.findByIdAndUpdate.mock.calls.length).toBe(1);
    });
  });
  describe("#update", () => {
    it("should call Student.findByIdAndUpdate", async () => {
      // Arrange
      const _id = new ObjectId();
      const id = _id.toString();
      const input = {
        name: "Tim",
      };
      const EXPECTED = {
        _id,
        name: "Tim",
        grade: "A+",
      };
      Student.findByIdAndUpdate.mockResolvedValue(EXPECTED);

      // Act
      const res = await StudentService.update(id, input);

      //Assert
      expect(Student.findByIdAndUpdate).toBeCalledWith(id, input, {
        returnOriginal: false,
      });
      expect(Student.findByIdAndUpdate.mock.calls.length).toBe(1);
      expect(res).toEqual(EXPECTED);
    });
    it("should throw an error if not found", async () => {
      // Arrange
      const _id = new ObjectId();
      const id = _id.toString();
      const input = {
        name: "Tim",
        grade: "A+",
      };
      Student.findByIdAndUpdate.mockResolvedValue(null);

      // Act
      //Assert
      await expect(StudentService.update(id, input)).rejects.toThrow(
        `Student with id ${id} not found`
      );
    });
    it("should throw an error with bad data", async () => {
      // Arrange
      const _id = new ObjectId();
      const id = _id.toString();
      const input = {};

      // Act
      //Assert
      await expect(StudentService.update(id, input)).rejects.toThrow(
        "No changes given"
      );
    });
  });
  describe("#deleteOne", () => {
    it("should call Student.findByIdAndDelete", async () => {
      // Arrange
      const EXPECTED = {
        _id: new ObjectId(),
        name: "Tim",
        grade: "A+",
      };
      Student.findByIdAndDelete.mockResolvedValue(EXPECTED);

      // Act
      const res = await StudentService.deleteOne("123412341234");

      //Assert
      expect(Student.findByIdAndDelete).toBeCalledWith("123412341234");
      expect(Student.findByIdAndDelete.mock.calls.length).toBe(1);
      expect(res).toEqual(EXPECTED);
    });
    it("should throw an error if not found", async () => {
      // Arrange
      const _id = new ObjectId();
      const id = _id.toString();
      Student.findByIdAndDelete.mockResolvedValue(null);

      // Act
      //Assert
      await expect(StudentService.deleteOne(id)).rejects.toThrow(
        `Student with id ${id} not found`
      );
    });
  });
});
