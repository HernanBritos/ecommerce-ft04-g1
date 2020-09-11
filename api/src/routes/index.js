const { Router } = require("express");
// import all routers;
const productRouter = require("./product.js");
const categoryRouter = require("./category.js");
const usersRouter = require('./user.js');
const ordersRouter = require("./orders")
const router = Router();

// load each router on a route
// i.e: router.use('/auth', authRouter);
// router.use('/auth', authRouter);
router.use("/products", productRouter);
router.use("/categories", categoryRouter);
router.use("/users", usersRouter);
router.use("/orders", ordersRouter);

module.exports = router;
