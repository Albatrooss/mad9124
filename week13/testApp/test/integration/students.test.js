"use strict";

require("dotenv/config");
const mongoose = require("mongoose");
const express = require("express");
const supertest = require("supertest");
const { ObjectId } = require("mongodb");

const studentRouter = require("../../src/router/students");
const sanitizeBody = require("../../src/middleware/sanitizeBody");
const { errorHandler } = require("../../src/utils/errors");
const createStudent = require("./mocks/student.mock");
const Student = require("../../src/models/student");

const app = express();
app.use(express.json());
app.use("/api/students", sanitizeBody, studentRouter);
app.use(errorHandler);

if (!process.env.MONGO_URL_TEST.includes("localhost")) {
  throw new Error("Invalid testing db");
}
const NOW = new Date();
Date = jest.fn(() => NOW);
Date.now = jest.fn(() => NOW.valueOf());
beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URL_TEST);
});

afterEach(async () => {
  await Student.deleteMany({});
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe("Student Resource", () => {
  describe("GET /", () => {
    it("happy path", async () => {
      // Arrange
      const createdStudent = await createStudent();

      // Act
      const response = await supertest(app).get("/api/students").expect(200);

      // Assert
      expect(response.body).toStrictEqual({
        data: [createdStudent],
      });
    });
  });
  describe("GET /:id", () => {
    it("happy path", async () => {
      // Arrange
      const createdStudent = await createStudent({
        name: "roy",
      });

      // Act
      const { body } = await supertest(app)
        .get(`/api/students/${createdStudent._id.toString()}`)
        .expect(200);

      // Assert
      expect(body).toStrictEqual({
        data: createdStudent,
      });
    });
    it("should return 404", async () => {
      // Act
      const { body } = await supertest(app)
        .get("/api/students/123412341234")
        .expect(404);

      // Assert
      expect(body).toStrictEqual({
        error: "Student with id 123412341234 not found",
      });
    });
  });
  describe("POST /", () => {
    it("happy path", async () => {
      // Arrange
      const input = {
        name: "teagan",
        grade: "A+",
      };

      // Act
      const { body } = await supertest(app)
        .post("/api/students")
        .send(input)
        .expect(201);

      const allStudents = await Student.find();

      expect(allStudents.length).toBe(1);
      expect(body.data).toStrictEqual(
        JSON.parse(JSON.stringify(allStudents[0]))
      );
      expect(allStudents[0]).toMatchObject(input);
    });
    it("should not create a student with bad input", async () => {
      // Arrange
      const input = {
        name: "mathieu",
      };

      // Act
      const { body } = await supertest(app)
        .post("/api/students")
        .send(input)
        .expect(400);

      // Assert
      const allStudents = await Student.find();
      expect(body).toStrictEqual({
        error: "student validation failed: grade: Path `grade` is required.",
      });
      expect(allStudents.length).toBe(0);
    });
  });
  describe("PUT /:id", () => {
    it("happy path", async () => {
      // Arrange
      const createdStudent = await createStudent();
      const input = {
        name: "tom",
        grade: "C+",
      };

      // Act
      const { body } = await supertest(app)
        .put(`/api/students/${createdStudent._id}`)
        .send(input)
        .expect(200);

      const students = await Student.find();
      const student = JSON.parse(JSON.stringify(students[0]));

      // Assert
      expect(body.data).toEqual({ ...createdStudent, ...input });
      expect(student).toEqual({ ...createdStudent, ...input });
    });
    it("should return status 400 for bad request", async () => {
      // Arrange
      const createdStudent = await createStudent();
      const input = { name: "tim" };

      // Act
      const { body } = await supertest(app)
        .put(`/api/students/${createdStudent._id}`)
        .send(input)
        .expect(400);

      // Assert
      expect(body).toEqual({
        error: "Name and Grade required",
      });
    });
    it("should return status 404 for bad request", async () => {
      // Arrange
      const id = new ObjectId().toString();
      const input = { name: "tom", grade: "C-" };

      // Act
      const { body } = await supertest(app)
        .put(`/api/students/${id}`)
        .send(input)
        .expect(404);

      // Assert
      expect(body).toEqual({
        error: `Student with id ${id} not found`,
      });
    });
  });
  describe("PATCH /:id", () => {
    it("happy path", async () => {
      // Arrange
      const createdStudent = await createStudent();
      const input = {
        name: "tom",
      };

      // Act
      const { body } = await supertest(app)
        .patch(`/api/students/${createdStudent._id}`)
        .send(input)
        .expect(200);

      const students = await Student.find();
      const student = JSON.parse(JSON.stringify(students[0]));

      // Assert
      expect(body.data).toEqual({ ...createdStudent, ...input });
      expect(student).toEqual({ ...createdStudent, ...input });
    });
    it("should return status 400 for bad request", async () => {
      // Arrange
      const createdStudent = await createStudent();
      const input = {};

      // Act
      const { body } = await supertest(app)
        .patch(`/api/students/${createdStudent._id}`)
        .send(input)
        .expect(400);

      // Assert
      expect(body).toEqual({
        error: "No changes given",
      });
    });
    it("should return status 404 for bad request", async () => {
      // Arrange
      const id = new ObjectId().toString();
      const input = { name: "tom" };

      // Act
      const { body } = await supertest(app)
        .patch(`/api/students/${id}`)
        .send(input)
        .expect(404);

      // Assert
      expect(body).toEqual({
        error: `Student with id ${id} not found`,
      });
    });
  });
  describe("DELETE /:id", () => {
    it("happy path", async () => {
      // Arrange
      const createdStudent = await createStudent();

      // Act
      const { body } = await supertest(app)
        .delete(`/api/students/${createdStudent._id}`)
        .expect(200);

      const students = await Student.find();

      // Assert
      expect(body.data).toEqual(createdStudent);
      expect(students.length).toBe(0);
    });
    it("should return status 404 for bad request", async () => {
      // Arrange
      const id = new ObjectId().toString();

      // Act
      const { body } = await supertest(app)
        .delete(`/api/students/${id}`)
        .expect(404);

      // Assert
      expect(body).toEqual({
        error: `Student with id ${id} not found`,
      });
    });
  });
});
