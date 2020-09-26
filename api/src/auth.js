const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.json({ message: "Debes estar logueado para hacer esto" });
  }
};
helpers.isAdmin = (req, res, next) => {
  if (req.user.rol === "admin") {
    next();
  } else {
    res.json({ message: "Debes ser admin para hacer esto" });
  }
};
module.exports = helpers;
