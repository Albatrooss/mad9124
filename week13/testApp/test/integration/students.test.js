"use strict";

require("dotenv/config");
const express = require("express");
const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");
const supertest = require("supertest");

const sanitizeBody = require("../../src/middleware/sanitizeBody");
const studentRouter = require("../../src/router/students");
const { errorHandler } = require("../../src/utils/errors");

const createStudent = require("./mocks/student.mock");
const Student = require("../../src/models/student");

const app = express();
app.use(express.json());
app.use("/api/students", sanitizeBody, studentRouter);
app.use(errorHandler);

const NOW = new Date("1991-12-16");
Date = jest.fn(() => NOW);
Date.now = jest.fn(() => NOW.valueOf());

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URL_TEST);
});

afterEach(async () => {
  await Student.deleteMany();
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
      const { body } = await supertest(app).get("/api/students").expect(200);

      // Assert
      expect(body).toStrictEqual({
        data: [createdStudent],
      });
    });
  });
  describe("GET /:id", () => {
    it("happy path", async () => {
      // Arrange
      const createdStudent = await createStudent();

      // Act
      const { body } = await supertest(app)
        .get(`/api/students/${createdStudent._id.toString()}`)
        .expect(200);

      // Assert
      expect(body).toStrictEqual({
        data: createdStudent,
      });
    });
    it("should throw not found error", async () => {
      // Arrange
      const _id = new ObjectId();
      const id = _id.toString();

      // Act
      const { body } = await supertest(app)
        .get(`/api/students/${id}`)
        .expect(404);

      // Assert
      expect(body).toStrictEqual({
        error: `Student with id ${id} not found`,
      });
    });
  });
  describe("POST /", () => {});

  //
  describe("PUT /:id", () => {
    it("happy path", async () => {
      // Arrange
      const createdStudent = await createStudent();
      const id = createdStudent._id.toString();
      const newStudentData = {
        name: "anqi",
        grade: "A+",
      };

      // Act
      const { body } = await supertest(app)
        .put(`/api/students/${id}`)
        .send(newStudentData)
        .expect(200);

      expect(body).toStrictEqual({
        data: {
          ...createdStudent,
          ...newStudentData,
        },
      });
    });
    it("should return 400 with bad data", async () => {});
    it("should return 404 when not found", async () => {});
  });
  describe("PATCH /:id", () => {});
  describe("DELETE /:id", () => {});
});
