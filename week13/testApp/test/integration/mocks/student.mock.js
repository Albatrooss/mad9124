const Student = require("../../../src/models/student");

const createStudent = async (input) => {
  const newStudent = new Student({
    name: "tim",
    grade: "B",
    ...input,
  });
  await newStudent.save();

  return JSON.parse(JSON.stringify(newStudent));
};

module.exports = createStudent;
