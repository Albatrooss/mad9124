const students = require("../models/students");

const validateStudentId = (req, res, next) => {
  const { id } = req.params;
  const studentIndex = students.findIndex((student) => student.id === id);

  if (studentIndex < 0) {
    res.status(404).json({
      error: `Student with id ${id} not found`,
    });
    return;
  }

  req.student = students[studentIndex];
  req.studentIndex = studentIndex;

  next();
};

module.exports = validateStudentId;
