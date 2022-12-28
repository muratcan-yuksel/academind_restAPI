const express = require("express");
const router = express.Router();
const upload = require("../middleware/multerMiddleware");
const jwtAuthMiddleware = require("../middleware/check-auth");
const {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/products");

router
  .route("/")
  .get(getAllProducts)
  .post(upload.single("productImage"), jwtAuthMiddleware, createProduct);

router
  .route("/:id")
  .get(getProduct)
  .patch(jwtAuthMiddleware, updateProduct)
  .delete(jwtAuthMiddleware, deleteProduct);

module.exports = router;
