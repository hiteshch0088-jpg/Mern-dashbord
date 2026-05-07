const upload = require("../middleware/upload");
const User = require("../models/User");
const fs = require("fs");
const path = require("path");

exports.uploadProfile = async (req, res) => {
    

  try {
    const { userId } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    if (!userId) {
      return res.status(400).json({ error: "User ID required" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.profile) {
      const oldPath = path.join(__dirname, "../uploads", user.profile);

      if (fs.existsSync(oldPath)) {
        fs.unlink(oldPath, (err) => {
          if (err) console.log(err);
        });
      }
    }

    user.profile = req.file.filename;
    await user.save();

    res.json({
      message: "Profile updated successfully",
      image: user.profile,
      user,
    });
  } catch (err) {
    console.log("UPLOAD ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};
