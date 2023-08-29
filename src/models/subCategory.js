const mongoose = require("mongoose");

const subcategorySchema = mongoose.Schema(
  {
    name: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
  },
);

const subcategory = mongoose.model("Subcategory", subcategorySchema);

module.exports = subcategory;
