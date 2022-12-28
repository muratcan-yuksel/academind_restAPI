const User = require("../models/user");
const asyncWrapper = require("../middleware/async");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

//create user
const signup = asyncWrapper(async (req, res) => {
  const existingUser = await User.find({ email: req.body.email });
  if (existingUser.length >= 1) {
    return res.status(409).json({
      message: "Mail exists",
    });
  }
  const hash = await bcrypt.hash(req.body.password, 10);
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    email: req.body.email,
    password: hash,
  });
  await user.save();
  res.status(201).json({
    message: "User created",
  });
});

//get users
const getUsers = asyncWrapper(async (req, res) => {
  const users = await User.find();
  res.status(200).json({
    users,
  });
});

//login user
const login = asyncWrapper(async (req, res) => {
  const user = await User.find({ email: req.body.email });
  if (user.length < 1) {
    return res.status(401).json({
      message: "Auth failed",
    });
  }
  const result = await bcrypt.compare(req.body.password, user[0].password);
  if (result) {
    const token = jwt.sign(
      {
        email: user[0].email,
        userId: user[0]._id,
      },
      //in order for this to work, I added the password I've created for my user to the .env file
      process.env.JWT_KEY,
      {
        expiresIn: "1h",
      }
    );
    return res.status(200).json({
      message: "Auth successful",
      token: token,
    });
  }
  res.status(401).json({
    message: "Auth failed",
  });
});

//delete user
const deleteUser = asyncWrapper(async (req, res) => {
  await User.remove({ _id: req.params.userId });
  res.status(200).json({
    message: "User deleted",
  });
});

module.exports = {
  signup,
  getUsers,
  login,
  deleteUser,
};
