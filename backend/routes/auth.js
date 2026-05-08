const express = require("express");
const router = express.Router();
const authcontroller = require("../controller/authcontroller");
const logincontroller = require("../controller/logincontroller");
const dashbordcontroller = require("../controller/dashbordcontroller"); 
const  forgotcontroller= require("../controller/forgotcontroller");
const ordercontroller = require("../controller/ordercontroller");
const productcontroller = require("../controller/productcontroller");
const profilecontroller = require("../controller/profilecontroller");
const userscontroller = require("../controller/userscontroller");
const verifycontroller = require("../controller/verifycontroller");

const upload = require("../middleware/upload");
const googlelogincontroller = require("../controller/googlelogincontroller");



router.post("/send-otp", authcontroller.sendOTP);
router.post("/verify-otp", authcontroller.verifyOTP);
router.post("/signup",logincontroller.signup);
router.post("/login",logincontroller.login);
router.get("/dashboard", dashbordcontroller.dashboard);
router.get("/", forgotcontroller.forgotPassword);
router.get("/aa/orders", ordercontroller.getAllOrders);
router.post("/bb/orders", ordercontroller.createOrder);
router.delete("/cc/orders/:id", ordercontroller.deleteOrder);
router.post("/bbb/products", productcontroller.createProduct);
router.get("/aaa/products", productcontroller.getAllProducts);
router.delete("/ccc/products/:id", productcontroller.deleteProduct);
router.post("/upload",upload.single("image"),profilecontroller.uploadProfile);



router.get("/users", userscontroller.getUsers);
router.post("/users", userscontroller.createUsers);
router.delete("/users/:id", userscontroller.deleteUsers);

router.post("/reset-password", verifycontroller.resetPassword);

router.post("/google-login", googlelogincontroller.googleLogin);


module.exports = router;  