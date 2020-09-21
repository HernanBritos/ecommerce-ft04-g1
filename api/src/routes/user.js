const server = require("express").Router();
const { User } = require("../db.js");
const { Op } = require("sequelize");
const { ShoppingCart } = require("../db.js");
const OrderProduct = require("../models/OrderProduct.js");
const bcrypt = require('bcrypt');
const passport = require('passport');

isAuthenticated = (req, res, next) => {
  console.log(req.isAuthenticated());
  if (req.user) return next();
  else
    return res.json({
      loggedin: false,
      isAdmin: false,
      message: 'User not authenticated',
    });
};
isAdmin = (req, res, next) => {
  console.log(req.isAuthenticated());
  if (req.user.rol === 'admin') return next();
  else
    return res.json({
      loggedin: false,
      isAdmin: false,
      message: 'User is not admin',
    });
};

server.post('/login', (req, res, next) => {
  console.log(req.body)
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return json({
        success: false,
        message: err.message,
        info,
      });
    }
    if (!user) {
      return res.json({
        success: false,
        info,
      });
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.json(err);
      }
      console.log(user)
      return res.json({
        success: true,
        message: 'You have successfully logged in!',
        info,
        user,
      });
    });
  })(req, res, next);
});



// GET /users
server.get("/", (req, res, next) => {
  User.findAll()
    .then((users) => {
      res.send(users);
    })
    .catch(next);
});

// POST /users 

server.post('/', async (req, res) => {
  const {name,lastname,email,password,phone,address}=req.body;
  
      User.create({
      name: name,
      lastname: lastname,
      email: email,
      password: password,
      phone: phone,
      address: address,
    })
    .then(newUser => {
      res.json(newUser);
    })
    .catch(error => res.json(error));
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
  ShoppingCart.findOne({
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
  ShoppingCart.create({
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

  ShoppingCart.update(
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
  ShoppingCart.destroy({
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
  ShoppingCart.findOne({
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
module.exports = server;
