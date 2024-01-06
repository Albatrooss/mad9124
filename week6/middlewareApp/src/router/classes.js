const { Router } = require("express");
const classesRouter = Router();

classesRouter.use((req, res, next) => {
  console.log("CLASSES");
  next();
});

classesRouter.get(
  "/",
  (_req, _res, next) => {
    console.log("this is get all");
    next();
  },
  (req, res) => {
    res.json({
      classes: [],
    });
  }
);
classesRouter.get(
  "/:id",
  (req, _res, next) => {
    console.log(`the id is ${req.params.id}`);
    next();
  },
  (req, res) => {
    res.json({
      classes: [],
    });
  }
);

module.exports = classesRouter;
