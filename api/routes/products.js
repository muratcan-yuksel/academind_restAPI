const express = require("express");
const router = express.Router();

// Handle incoming GET requests to /products
//I should NOT use /products here because it is already defined in app.js
router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Handling GET requests to /products",
  });
});

router.post("/", (req, res, next) => {
  //I can use this "body" property because I used bodyParser in app.js
  const product = {
    name: req.body.name,
    price: req.body.price,
  };

  res.status(201).json({
    message: "Handling POST requests to /products",
    //to see if the product was created
    createdProduct: product,
  });
});

router.get("/:productId", (req, res, next) => {
  const id = req.params.productId;
  if (id === "special") {
    res.status(200).json({
      message: "You discovered the special ID",
      //returns the id in message
      id: id,
    });
  } else {
    res.status(200).json({
      message: "You passed an ID",
    });
  }
});

router.patch("/:productId", (req, res, next) => {
  res.status(200).json({
    message: "Updated product!",
  });
});

router.delete("/:productId", (req, res, next) => {
  res.status(200).json({
    message: "Deleted product!",
  });
});

module.exports = router;
