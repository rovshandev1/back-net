const stripe = require("stripe")("Stripe-API-klyuchi");

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
