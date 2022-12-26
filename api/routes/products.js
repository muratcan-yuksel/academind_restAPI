const express = require("express");
const router = express.Router();
//multer
const multer = require("multer");
// const upload = multer({ dest: "uploads/" });
//configure how the files are stored
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //where to store the file
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});
// const fileFilter = (req, file, cb) => {
//   //reject a file
//   if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  // fileFilter: fileFilter,
});

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
