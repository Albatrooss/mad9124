const { Router } = require("express");
const StudentController = require("../controllers/students");

const studentRouter = Router();

studentRouter.get("/", StudentController.getAll);
studentRouter.get("/:id", StudentController.getOne);
studentRouter.post("/", StudentController.create);
studentRouter.put("/:id", StudentController.replace);
studentRouter.patch("/:id", StudentController.update);
studentRouter.delete("/:id", StudentController.deleteOne);

module.exports = studentRouter;
