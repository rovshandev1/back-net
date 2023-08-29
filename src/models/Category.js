const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
  {
    name: {
      type: mongoose.SchemaTypes.String,
      required: true,
      unique: true
    },
    subcategories : {
      type : [mongoose.SchemaTypes.ObjectId] ,
      default : [] ,
      ref : "Subcategory"
    }
  },
);


const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
