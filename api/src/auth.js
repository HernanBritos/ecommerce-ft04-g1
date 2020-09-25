const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.json({ message: "Debes estar logueado para hacer esto" });
  }
};
module.exports = helpers;
