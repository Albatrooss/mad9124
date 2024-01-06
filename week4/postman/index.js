"use strict";

const path = require("path");
const express = require("express");
const app = express();

// RESOURCE
const students = [
  { id: "1", name: "tim", grade: "A+" }, //0
  { id: "2", name: "jad", grade: "A+" }, // 1
  { id: "3", name: "hena", grade: "A+" },
  { id: "4", name: "eduardo", grade: "A+" },
];

// this just tells express to expect JSON data in the request body
app.use(express.json());

app.get("/", (_, res) => {
  res.json({ data: { message: "Server Running" } });
});

// CREATE
app.post("/students", (req, res) => {
  const { name, grade } = req.body;

  if (!name || !grade) {
    res.status(400).json({
      error: "Name and Grade required",
    });
  } else {
    const id = parseInt(students[students.length - 1].id, 10) + 1;
    const newStudent = {
      id: id.toString(),
      name,
      grade,
    };
    students.push(newStudent);

    res.status(201).json({ data: newStudent });
  }
});

// READ
app.get("/students", (_, res) => {
  res.json({
    data: students,
  });
});

// READ
app.get("/students/:id", (req, res) => {
  const { id } = req.params;

  const student = students.find((student) => student.id === id);
  if (!student) {
    res.status(404).json({
      errors: [
        {
          message: `Student with id ${id} not found`,
        },
      ],
    });
    return;
  }

  res.json({
    data: student,
  });
});

// UPDATE
app.put("/students/:id", (req, res) => {
  const { id } = req.params;
  const newStudentData = req.body;
  const newStudent = {
    id,
    ...newStudentData,
  };

  const idx = students.findIndex((student) => student.id === id);
  if (idx < 0) {
    res.status(404).json({
      errors: [
        {
          message: `Student with id ${id} not found`,
        },
      ],
    });
    return;
  }

  students[idx] = newStudent;

  res.json({
    data: newStudent,
  });
});

// UPDATE
app.patch("/students/grade/:id", (req, res) => {
  const { id } = req.params;
  const { grade } = req.body;

  const idx = students.findIndex((student) => student.id === id);
  if (idx < 0) {
    res.status(404).json({
      errors: [
        {
          message: `Student with id ${id} not found`,
        },
      ],
    });
    return;
  }

  students[idx].grade = grade;

  res.json({ data: students[idx] });
});

// UPDATE
app.patch("/students/:id", (req, res) => {
  const { id } = req.params;
  const updatedFields = req.body;

  const idx = students.findIndex((student) => student.id === id);

  if (idx < 0) {
    res.status(404).json({
      errors: [
        {
          message: `Student with id ${id} not found`,
        },
      ],
    });
    return;
  }

  const updatedStudent = {
    ...students[idx],
    ...updatedFields,
  };

  students[idx] = updatedStudent;

  res.json({ data: updatedStudent });
});

// DELETE
app.delete("/students/:id", (req, res) => {
  const { id } = req.params;

  const idx = students.findIndex((student) => student.id === id);
  if (idx < 0) {
    res.status(404).json({
      errors: [
        {
          message: `Student with id ${id} not found`,
        },
      ],
    });
    return;
  }

  const [deletedStudent] = students.splice(idx, 1);
  res.json({ data: deletedStudent });
});

// app.get("/students/:id/classes", async (req, res) => {
//   const { id } = req.params;
//   // Copied from postman
//   const mockClassUrl =
//     "https://97f14c77-0ae2-4d7e-85cb-c28624a8ec65.mock.pstmn.io";
//   const classesResponse = await fetch(`${mockClassUrl}/${id}`);
//   const classes = await classesResponse.json();
//   res.json(classes);
// });

// app.get("/students/download", (_, res) => {
//   res.sendFile("./test.csv");
// });

app.listen(3000, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log("Server running on port 3000");
});
