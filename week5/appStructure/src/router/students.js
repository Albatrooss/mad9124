const { Router } = require("express");
const studentController = require("../controllers/students");
const studentRouter = Router();

studentRouter.post("/", studentController.create);
studentRouter.get("/", studentController.getAll);
studentRouter.get("/:id", studentController.getOne);
studentRouter.put("/:id", studentController.replace);
studentRouter.patch("/:id", studentController.update);
studentRouter.delete("/:id", studentController.deleteOne);

module.exports = studentRouter;
