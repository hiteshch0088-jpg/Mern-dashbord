
const Users = require("../models/User");

exports.createUsers = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "All fields required" });
    }

    const user = new Users({ name, email });
    await user.save();

    res.status(201).json(user);
  } catch (err) {
    console.log("CREATE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await Users.find(); 

    res.json(users);
  } catch (err) {
    console.log("GET ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};


exports.deleteUsers = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "ID required" });
    }

    await Users.findByIdAndDelete(id);

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.log("DELETE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};
