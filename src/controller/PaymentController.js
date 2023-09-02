const { secretKey } = require("../config/stripe");
const stripe = require("stripe")(secretKey);

const Payment = require("../models/Payment");

// Function to make a Stripe payment
exports.processPayment = async (req, res) => {
  try {
    const { amount, currency, paymentMethod } = req.body;

    // Make a Stripe payment
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: currency,
      payment_method_types: [paymentMethod],
    });

    // Saving the payment result
    const payment = new Payment({
      user: req.user.userId,
      amount: amount,
      currency: currency,
      paymentMethod: paymentMethod,
      paymentIntent: paymentIntent.id,
      status: paymentIntent.status,
    });

    await payment.save();

    res.json({ success: true, paymentIntent: paymentIntent });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find();
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ success: false, error: "Server error" });
  }
};

exports.getPaymentHistory = async (req, res) => {
  const userId = req.user.userId; // Foydalanuvchi identifikatori
  try {
    const paymentHistory = await Payment.find({ user: userId });
    res.status(200).json(paymentHistory);
  } catch (error) {
    res.status(500).json({ success: false, error: "Server error" });
  }
};