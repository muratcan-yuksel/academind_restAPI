const express = require("express");
const router = express.Router();
//multer
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

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
  .post(upload.single("productImage"), createProduct);

router.route("/:id").get(getProduct).patch(updateProduct).delete(deleteProduct);

module.exports = router;
