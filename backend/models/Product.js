const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    category: String,
    stock: Number,
  },
  { timestamps: true },
);

module.exports = mongoose.model("Produddgdgdct", productSchema , "product");
