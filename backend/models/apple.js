const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  name: String,
  product: String,
  amount: Number,
});

module.exports = mongoose.model("apple", orderSchema);