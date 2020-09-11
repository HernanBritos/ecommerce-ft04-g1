const server = require("express").Router();
const {OrderProduct} = require("../models/OrderProduct.js");

// GET /orders
// Esta ruta puede recibir el query string status y deberá devolver sólo las ordenes con ese status.
server.get("/", (req, res) => {
    const qstatus = req.query.status;
    OrderProduct.findAll({
        where: {status: qstatus},
    }).then((response)=> {
        res.status(200).json(response);
    }).catch((err) =>
    res.status(400).send(err, " WARNING! -> Order id does not exist")
    );
    });



// GET /orders/:id

server.get("/:id", (req, res) => {
    
const id = req.params.id;
OrderProduct.findAll({
    where: {idShoppingcart: id},
}).then((response)=> {
    res.status(200).json(response);
}).catch((err) =>
res.status(400).send(err, " WARNING! -> Order id does not exist")
);
});

// PUT /orders/:id

server.put("/:id", (req, res) => {
    const id = req.params.id;
  
    OrderProduct.update(
      {
        idShoppingcart: req.body.idShoppingcart,
        idProduct: req.body.idProduct,
        price: req.body.price,
        ammount: req.body.ammount,
        status: req.body.status,    
      },
      {
        where: {
          idShoppingcart: id,
        },
        returning: true,
      }
    )
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((err) =>
        res.status(400).send(err, " WARNING! -> You can´t modificate the Order")
      );
  });


module.exports = server;