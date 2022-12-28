const User = require("../models/user");
const asyncWrapper = require("../middleware/async");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

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

module.exports = {
  signup,
  getUsers,
};
