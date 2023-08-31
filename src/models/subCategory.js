const mongoose = require("mongoose");

const subcategorySchema = mongoose.Schema({
  name: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  products: {
    type: [mongoose.SchemaTypes.ObjectId],
    default: [],
    ref: "product",
  },
});

const subcategory = mongoose.model("Subcategory", subcategorySchema);

module.exports = subcategory;
