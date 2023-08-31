const mongoose = require("mongoose");

const orderItemSchema = mongoose.Schema({
  quantity: {
    type: String,
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
});

const orderItem = mongoose.model("OrderItem", orderItemSchema);

module.exports = orderItem;
