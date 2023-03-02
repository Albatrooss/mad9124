const students = require("../models/students");

const isAuthenticated = (req, res, next) => {
  const { user_token } = req.headers;

  const student = students.find((student) => student.id === user_token);

  // not authenticated
  if (!student) {
    res.status(401).json({
      error: "Please sign in to access this data",
    });
    return;
  }
  req.user = student;
  next();
};

module.exports = isAuthenticated;
