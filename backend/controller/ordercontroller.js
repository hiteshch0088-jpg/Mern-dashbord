  const express = require("express");
const Order = require("../models/Order.js");



exports.createOrder = async (req, res) => {
  try {
    const { name, product, amount } = req.body;

    if (!name || !product || !amount) {
      return res.status(400).json({ error: "All fields required" });
    }

    const order = new Order({ name, product, amount });
    await order.save();

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllOrders = async (req, res) => {
  try{
  const orders = await Order.find();
  res.json(orders);
}catch(err){
  res.status(500).json({ error: err.message });
}
};

exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "ID is required" });
    }

    const deleted = await Order.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json({ message: "Order deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

