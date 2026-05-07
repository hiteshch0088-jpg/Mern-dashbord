const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendmail = async (email, token) => {
  const resetLink = `http://localhost:5173/reset-password/${token}`;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Reset Password",
    html: `
      <h3>Reset your password</h3>
      <p>Click below link:</p>
      <a href="${resetLink}">${resetLink}</a>
    `,
  });
};

module.exports = sendmail;