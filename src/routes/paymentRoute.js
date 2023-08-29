const express = require("express");
const router = express.Router();

const { authenticateUser } = require("../middleware/auth");
const payment = require("../controller/PaymentController");

router.post("/payment", authenticateUser, payment.processPayment);

module.exports = router;
