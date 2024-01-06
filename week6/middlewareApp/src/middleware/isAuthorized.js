const isAuthorized = (role) => (req, res, next) => {
  const { user } = req;
  if (!user) {
    res.status(401).json({
      error: "Please sign in",
    });
    return;
  }
  if (user.role !== role) {
    res.status(403).json({
      error: `Must be a ${role} to acces this data`,
    });
    return;
  }
  next();
};

module.exports = isAuthorized;
