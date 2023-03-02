const { Router } = require("express");
const isAuthenticated = require("../middleware/isAuthenticated");
const isAuthorized = require("../middleware/isAuthorized");
const validateStudentId = require("../middleware/validateStudentId");
const students = require("../models/students");
const studentRouter = Router();

studentRouter.get("/", (req, res) => {
  res.json({
    students,
  });
});

studentRouter.post("/", (req, res) => {
  const id = parseInt(students[students.length - 1].id, 10) + 1;
  const newStudent = {
    id: id.toString(),
    ...req.body,
  };

  students.push(newStudent);

  res.status(201).json({
    data: newStudent,
  });
});

studentRouter.get("/:id", validateStudentId, (req, res) => {
  const { student } = req;

  res.json({
    data: student,
  });
});

studentRouter.put("/:id", validateStudentId, (req, res) => {
  const { student, studentIndex } = req;
  const { name, grade } = req.body;

  const newStudent = {
    id: student.id,
    name,
    grade,
  };

  students[studentIndex] = newStudent;
  res.json({ data: newStudent });
});

studentRouter.patch("/:id", validateStudentId, (req, res) => {
  const { student, studentIndex } = req;

  //   const updatedStudent = {
  //     ...student,
  //     ...req.body,
  //   };
  const updatedStudent = Object.assign({}, student, req.body);

  students[studentIndex] = updatedStudent;

  res.json({ data: updatedStudent });
});

studentRouter.delete(
  "/:id",
  isAuthenticated,
  isAuthorized("ADMIN"),
  validateStudentId,
  (req, res) => {
    const { studentIndex } = req;

    const [deletedStudent] = students.splice(studentIndex, 1);

    res.json({ data: deletedStudent });
  }
);

module.exports = studentRouter;
