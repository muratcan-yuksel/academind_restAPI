const Order = require("../models/orders");
const asyncWrapper = require("../middleware/async");

const getAllOrders = asyncWrapper(async (req, res) => {
  const orders = await Order.find();
  res.status(200).json({ orders });
});

const getOrder = asyncWrapper(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return res.status(404).json({ msg: `No order with id ${req.params.id}` });
  }
  res.status(200).json({ order });
});

const createOrder = asyncWrapper(async (req, res) => {
  const order = await Order.create(req.body);
  res.status(201).json({ order });
});

const updateOrder = asyncWrapper(async (req, res) => {
  const order = await Order.findOneAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!order) {
    return res.status(404).json({ msg: `No order with id ${req.params.id}` });
  }

  res.status(200).json({ order });
});

const deleteOrder = asyncWrapper(async (req, res) => {
  const order = await Order.findByIdAndDelete(req.params.id);
  if (!order) {
    return res.status(404).json({ msg: `No order with id ${req.params.id}` });
  }
  res.status(200).json({ msg: `order with id ${req.params.id} was deleted` });
});

module.exports = {
  getAllOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
};
