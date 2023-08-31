const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
    },
    likes: {
      ref: "User",
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
    },
    brand: {
      type: String,
    },
    isNew: {
      type: Boolean,
      default: false,
    },
  },
  { suppressReservedKeysWarning: true }
);

productSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

productSchema.set("toJSON", {
  virtuals: true,
});

const product = mongoose.model("Product", productSchema);

module.exports = product;