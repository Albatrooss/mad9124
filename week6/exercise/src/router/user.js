const { Router } = require("express");
const middleWare = require("../middleware/validateUserData");
const userRouter = Router();

/**
 * id: number;
 * name: string;
 * email: string;
 */
const users = [];

userRouter.get("/", (req, res) => {
  // return array of users
  res.json({ data: users });
});

//apply middleware
userRouter.post("/", middleWare.validateUserData, (req, res) => {
  // create a user, and add to array
  const { name, email } = req.body;
  const id = Date.now();
  const newUser = {
    id,
    name,
    email,
  };
  users.push(newUser);

  res.status(201).json({
    data: newUser,
  });
});

module.exports = userRouter;
