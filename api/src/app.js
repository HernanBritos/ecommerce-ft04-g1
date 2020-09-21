const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routes = require("./routes/index.js");
const { User } = require("./models/User");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const session = require("express-session");
var cors = require("cors");

require("./db.js");

const server = express();

server.name = "API";
server.use("/imagenes", express.static("imagenes"));
server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));

server.use(morgan("dev"));
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
server.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);
server.use(cors());
passport.initialize();
passport.session();
server.use(cookieParser("secretcode"));

passport.use(
  new passportLocal(async (email, password, done) => {
    await User.findOne({ where: { email: email } }, (err, user) => {
      if (!user) return done(null, false);
      if (user.checkPassword(password)) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);

server.use("/", routes);

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
  const user = await User.findOne({ where: { id: id } });
  if (user) {
    cb(user);
  }
});

// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
