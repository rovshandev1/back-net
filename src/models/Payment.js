const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    paymentMethod: {
      type: String, // Stripe, PayPal, yoki boshqa to'lov tizimlari nomi
      required: true,
    },
    paymentIntent: {
      type: String, // Stripe PaymentIntent ID (serverdan olinadi)
      required: true,
    },
    status: {
      type: String, 
      default: "Pending",
    },
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
