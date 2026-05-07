const mongoose = require("mongoose");

const userschema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  profile: String,
  
});

module.exports = mongoose.model("user",userschema);