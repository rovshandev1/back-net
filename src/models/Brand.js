const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  brand: {
    type: String,
  },
  products: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Product",
  },
});

productSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

productSchema.set("toJSON", {
  virtuals: true,
});

const brand = mongoose.model("Brand", brandSchema);

module.exports = brand;
