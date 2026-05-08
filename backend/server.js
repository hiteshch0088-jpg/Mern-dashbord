require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const userRoutes = require("./routes/auth.js");
const appleRoutes = require("./controller/applecontroller.js");

app.use(
  cors({
    origin: "https://mern-dashbord.vercel.app",
    credentials: true,
  })
);
app.use(express.json());
app.use("/api/auth", userRoutes);
app.use("/api", userRoutes);
app.use("/tt", userRoutes);
app.use("/api/dashboard", userRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/profile", userRoutes);//--------------------------------
app.use("/uploads", express.static("uploads"));
app.use("/api/auth", userRoutes);
app.use("/api/auth", userRoutes);
app.use("/ll/api", userRoutes);
app.use("/api", appleRoutes);
app.use("/api/auth", userRoutes);

app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  next();
});

mongoose.connect("mongodb+srv://hiteshch0088_db_user:XFF1W8qycUIOOBIO@cluster0.kq02z6s.mongodb.net/mern-dashboard")  
.then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use((req, res, next) => {
  res.header(
    "Cross-Origin-Opener-Policy",
    "same-origin-allow-popups"
  );

  res.header(
    "Cross-Origin-Embedder-Policy",
    "unsafe-none"
  );

  next();
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});