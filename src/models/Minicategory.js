const mongoose = require("mongoose");

const minicategorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subCategory",
      required: true,
    },
  },
  { suppressReservedKeysWarning: true }
);

const miniCategory = mongoose.model("miniCategory", minicategorySchema);

module.exports = miniCategory;
