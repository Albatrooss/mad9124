"use strict";

require("dotenv/config");
const mongoose = require("mongoose");
const express = require("express");
const supertest = require("supertest");

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
  describe("GET /:id", () => {});
  describe("POST /", () => {});
  describe("PUT /:id", () => {});
  describe("PATCH /:id", () => {});
  describe("DELETE /:id", () => {});
});
