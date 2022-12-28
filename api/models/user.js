const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  // productId: { type: String, required: true },
  // quantity: { type: Number, required: true },
  email: {
    type: String,
    required: true,
  },
  password: { type: String, required: true },
});

module.exports = mongoose.model("User", userSchema);
