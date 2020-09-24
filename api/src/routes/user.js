const server = require("express").Router();
const { User } = require("../db.js");
const { Op } = require("sequelize");
const { Order } = require("../db.js");
const OrderProduct = require("../models/OrderProduct.js");
const passport = require("passport");

// GET /users
server.get("/", (req, res, next) => {
  User.findAll()
    .then((users) => {
      res.send(users);
    })
    .catch(next);
});

server.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      res.json({
        success: false,
        message: err.message,
      });
    }
    if (!user) {
      res.json({
        success: false,
        message: "Usuario y/o contraseña incorrectos",
      });
    }
    req.logIn(user, (err) => {
      if (err) {
        res.json(err);
      }

      res.json({
        success: true,
        message: "Te has logueado correctamente!",
        user,
      });
    });
  })(req, res, next);
});

server.get("/logout", (req, res, next) => {
  req.logout();
  res.json({ message: "Sesion cerrada" });
});

// server.get("/session", (req, res, next) => {
//   res.json({ user: req.user });
// });

// POST /users
server.post("/", (req, res, next) => {
  const { name, lastname, email, password, phone, address } = req.body;

  User.create({
    name: name,
    lastname: lastname,
    email: email,
    password: password,
    phone: phone,
    address: address,
  })
    .then((newUser) => {
      res.send(newUser);
    })
    .catch((err) => res.status(400).send(err));
});

// PUT /users/:id
server.put("/:id", (req, res, next) => {
  const id = req.params.id;

  User.update(
    {
      name: req.body.name,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
      phone: req.body.phone,
      address: req.body.address,
      rol: req.body.rol,
    },
    {
      where: {
        id: id,
      },
      returning: true,
    }
  )
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) =>
      res.status(400).send(err, " WARNING! -> You can´t modificate the User")
    );
});

// DELETE /users/:id

server.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  User.destroy({
    where: { id: id },
  }).then((removed) => {
    if (removed) {
      res.status(200).end();
    } else {
      res.status(404).json({ message: "Not found" });
    }
  });
});

// GET /users/:idUser/cart

server.get("/:id/cart", (req, res, next) => {
  const id = req.params.id;
  Order.findOne({
    where: { idUser: id },
  })
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) =>
      res.status(400).send(err, " WARNING! -> UserCart does not exist")
    );
});

// POST /users/:idUser/cart

server.post("/:id/cart", (req, res, next) => {
  const id = req.params.id;
  Order.create({
    idUser: id,
    date: req.body.date,
    priceTotal: req.body.priceTotal,
    status: req.body.status,
    address: req.body.address,
    description: req.body.description,
    paymentmethod: req.body.paymentmethod,
    shipping: req.body.shipping,
  })
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) =>
      res
        .status(400)
        .send(err, " WARNING! -> You can´t modificate the UserCart")
    );
});

// PUT /users/:idUser/cart

server.put("/:id/cart", (req, res, next) => {
  const id = req.params.id;

  Order.update(
    {
      date: req.body.date,
      priceTotal: req.body.priceTotal,
      status: req.body.status,
      address: req.body.address,
      description: req.body.description,
      paymentmethod: req.body.paymentmethod,
      shipping: req.body.shipping,
    },
    {
      where: {
        idUser: id,
      },
      returning: true,
    }
  )
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) =>
      res
        .status(400)
        .send(err, " WARNING! -> You can´t modificate the ShoppingCart")
    );
});

// DELETE /users/:idUser/cart/

server.delete("/:id/cart", (req, res, next) => {
  const id = req.params.id;
  Order.destroy({
    where: { idUser: id },
  }).then((removed) => {
    if (removed) {
      res.status(200).end();
    } else {
      res.status(404).json({ message: "Not found" });
    }
  });
});

// GET /users/:id/orders

server.get("/:id/orders", (req, res) => {
  const id = req.params.id;
  Order.findAll({
    where: { idUser: id },
  })
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) =>
      res.status(400).send(err, " WARNING! -> Order does not exist")
    );
});

server.get("/:id", (req, res) => {
  const id = req.params.id;
  User.findOne({
    where: { id: id },
  })
    .then((User) => {
      res.send(User);
    })
    .catch((err) => res.status(404).send(err));
});

server.post("/:id/orders", (req, res, next) => {
  const id = req.params.id;
  Order.create({
    idUser: id,
    date: Date.now(),
    priceTotal: req.body.priceTotal,
    status: req.body.status,
    address: req.body.address,
    description: req.body.description,
    paymentmethod: req.body.paymentmethod,
    shipping: req.body.shipping,
  })
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) =>
      res
        .status(400)
        .send(err, " WARNING! -> You can´t modificate the UserCart")
    );
});

// Auth

server.post("/signup", async (req, res) => {
  const user = await User.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (user) {
    return res.json({ message: "Ya existe ese mail", success: false });
  }
  if (!user) {
    await User.create({
      name: req.body.name,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
      address: req.body.address,
      phone: req.body.phone,
    })
      .then((response) => {
        console.log("Usuario " + response.dataValues.email + " creado");
        return res.json({
          message: "Usuario creado correctamente",
          success: true,
        });
      })
      .catch((err) => res.send(err));
  }
});

const isAuthenticated = (req, res, next) => {
  if (req.user) return next();
  else
    return res.json({
      loggedin: false,
      isAdmin: false,
      message: "El usuario no está logueado",
    });
};

server.get("/checkauth", isAuthenticated, function (req, res) {
  res.status(200).json({
    loggedin: true,
    message: "El usuario está logueado",
    user: req.user,
  });
});

module.exports = server;
