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
  res.status(201).json({
    message: "Handling POST requests to /products",
  });
});

module.exports = router;
