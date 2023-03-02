const validateUserData = (req, res, next) => {
  // write your code here
  const { name, email } = req.body;
  if (!name || !email) {
    res.status(400).json({
      error: "Name and email are required",
    });
    return;
  }
  next();
};

const anotherMiddleware = () => {};

module.exports = { validateUserData, anotherMiddleware };
