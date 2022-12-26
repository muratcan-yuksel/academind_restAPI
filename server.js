const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");

const connectDB = require("./api/db/connect");
require("dotenv").config();

//import products route
const productRoutes = require("./api/routes/products");
//import orders route
const orderRoutes = require("./api/routes/orders");

//use morgan before the routes
//this specific one logs the request
//like, if we sent a request to orders, it logs "GET /orders/"
app.use(morgan("dev"));
//this parses the body of the request
app.use(bodyParser.urlencoded({ extended: false }));
//this will json data easily readable to us
app.use(bodyParser.json());

//handle cors
//need to use it before routes
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

//products middleware
//here I'm sending all requests to /products to the products route
//so that I don't have to write /products in the products.js in my routes
//I'll just write '/' there
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

//this is a middleware that handles all requests
//it will be executed if none of the above routes are executed
//so if I send a request to /orders, it will be handled by the orders route
//but if I send a request to /orderss, it will be handled by this middleware

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

//this is a middleware that handles all errors
//it will be executed if the above middleware is executed
//this will fire for instance when operations related to the database fail

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
