const Product = require("../models/product");
const asyncWrapper = require("../middleware/async");

const getAllProducts = asyncWrapper(async (req, res) => {
  const products = await Product.find();
  res.status(200).json({ products });
});

const getProduct = asyncWrapper(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({ msg: `No product with id ${req.params.id}` });
  }
  res.status(200).json({ product });
});

const createProduct = asyncWrapper(async (req, res) => {
  console.log(req.file);
  const product = await Product.create({
    ...req.body,
    file: req.file.path,
  });
  res.status(201).json({ product });
});

const updateProduct = asyncWrapper(async (req, res) => {
  const product = await Product.findOneAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!product) {
    return res.status(404).json({ msg: `No product with id ${req.params.id}` });
  }
  res.status(200).json({ product });
});

const deleteProduct = asyncWrapper(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    return res.status(404).json({ msg: `No product with id ${req.params.id}` });
  }
  res.status(200).json({ msg: `product with id ${req.params.id} was deleted` });
});

module.exports = {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
