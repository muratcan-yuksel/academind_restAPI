const express = require("express");
const router = express.Router();
const jwtAuthMiddleware = require("../middleware/check-auth");

const {
  getAllOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/orders");

router
  .route("/")
  .get(jwtAuthMiddleware, getAllOrders)
  .post(jwtAuthMiddleware, createOrder);

router
  .route("/:id")
  .get(jwtAuthMiddleware, getOrder)
  .patch(jwtAuthMiddleware, updateOrder)
  .delete(jwtAuthMiddleware, deleteOrder);

module.exports = router;
