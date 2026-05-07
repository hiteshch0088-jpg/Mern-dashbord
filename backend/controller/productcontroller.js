const express = require("express");
const Product = require("../models/Product.js");


exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.json(product);
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
