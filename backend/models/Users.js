const mongoose = require("mongoose");

const userschema = new mongoose.Schema({
    name: String,
    email: String,
    
    
});

module.exports = mongoose.model("Users",userschema);