const admin = require("../firebaseAdmin");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.googleLogin = async (req, res) => {
  try {

    const decodedToken = await admin
      .auth()
      .verifyIdToken(req.body.token);

    const { name, email } = decodedToken;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({
      success: true,
      user,
      token,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};