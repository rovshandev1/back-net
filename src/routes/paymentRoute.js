const express = require("express");
const router = express.Router();

const { isAdmin } = require("../middleware/authorization");
const { authenticateUser } = require("../middleware/auth");
const payment = require("../controller/PaymentController");

router.post("/", authenticateUser, payment.processPayment);

router.get("/history", authenticateUser, isAdmin, payment.getPaymentHistory);

router.get("/", authenticateUser, isAdmin, payment.getAllPayments);

module.exports = router;
