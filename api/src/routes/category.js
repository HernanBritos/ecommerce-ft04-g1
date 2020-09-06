const server = require("express").Router();
const { Product } = require("../db.js");
const { Categories } = require("../db.js");

server.get("/", (req, res, next) => {
  Categories.findAll()
    .then((category) => {
      res.send(category);
    })
    .catch(next);
});

server.post("/", (req, res) => {
  Categories.create({
    name: req.body.name,
  })
    .then((category) => {
      res.send({ category });
    })
    .catch((err) => res.send(err));
});

server.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  Categories.destroy({
    where: { id: id },
  }).then((removed) => {
    if (removed) {
      res.status(200).end();
    } else {
      res.status(404).json({ message: "Not found" });
    }
  });
});

module.exports = server;
