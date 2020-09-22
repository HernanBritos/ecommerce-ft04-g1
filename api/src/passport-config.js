const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/User");

function initialize(passport) {
  const authenticateUser = (email, password, done) => {
    User.findOne({ where: { email: email } }).then((res) => {
      console.log(res);
    });
  };
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      authenticateUser
    )
  );
  passport.serializeUser((user, done) => {
    return done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    User.findOne({ where: { id: id } }).then((res) => {
      return res;
    });
  });
}
module.exports = initialize;
