const isAuthenticated = (req, res, next) => {
    if (!req.user) {
      res.status(401).json({
        error: "You mush be logged in to see this",
      });
      return;
    }
    return next();
  };
  
  module.exports = isAuthenticated;
  