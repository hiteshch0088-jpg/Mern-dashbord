const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  name: String,
  product: String,
  amount: Number,
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);