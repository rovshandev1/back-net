const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middleware/auth");
const UserController = require("../controller/authController");

router.post("/register", UserController.registerUser);

router.post("/login", UserController.login);

router.post("/confirmEmail", authenticateUser, UserController.confirmEmail);

module.exports = router;
