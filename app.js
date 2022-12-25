const express = require("express");
const app = express();
//import products route
const products = require("./api/routes/products");

//products middleware
//here I'm sending all requests to /products to the products route
//so that I don't have to write /products in the products.js in my routes
//I'll just write '/' there
app.use("/products", products);

// app.use((req, res, next) => {
//   res.status(200).json({
//     message: "It works!",
//   });
// });

module.exports = app;
