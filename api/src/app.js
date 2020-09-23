const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routes = require("./routes/index.js");
const UserSchema = require("./models/User");
const { User } = require("./db");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const session = require("express-session");
var cors = require("cors");

require("./db.js");

const server = express();
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

server.name = "API";
server.use("/imagenes", express.static("imagenes"));
server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));

server.use(morgan("dev"));
server.use(cors());

passport.initialize();
passport.session();
server.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});
server.use(passport.initialize());
server.use(passport.session());
server.use(cookieParser("secretcode"));

server.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: false,
      httpOnly: false,
      maxAge: 600000,
    },
  })
);

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      session: true,
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({
          where: {
            email: email,
          },
        });

        if (!user) {
          done(null, false, {
            message: "Incorrect credentials.",
          });
        }
        if (user.checkPassword(password)) {
          done(null, user);
        }

        done(null, false, {
          message: "Incorrect credentials.",
        });
      } catch (err) {
        done(null, false, {
          message: "Failed",
        });
      }
    }
  )
);

passport.serializeUser((user, done) => {
  return done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findOne({
      where: {
        id: id,
      },
    });

    if (!user) {
      return done(null, false, { message: "User does not exist" });
    }

    return done(null, user);
  } catch (err) {
    return done(null, false, { message: "Failed" });
  }
});

server.use("/", routes);

// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
