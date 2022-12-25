const express = require("express");
const app = express();
//import products route
const productRoutes = require("./api/routes/products");
//import orders route
const orderRoutes = require("./api/routes/orders");

//products middleware
//here I'm sending all requests to /products to the products route
//so that I don't have to write /products in the products.js in my routes
//I'll just write '/' there
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

// app.use((req, res, next) => {
//   res.status(200).json({
//     message: "It works!",
//   });
// });

module.exports = app;
