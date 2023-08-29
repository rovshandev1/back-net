const Category = require("../models/category");
const subCategory = require("../models/subCategory");

exports.createSubCategory = async (req, res) => {
  try {
    const { name, category } = req.body;
    const existingCategory = await subCategory.findOne({ name });

console.log(req.body);
    if (existingCategory) {
      return res.status(400).json({ error: "Bunday katalog mavjud" });
    }

    const result = await subCategory.create({
      name,
    });
    console.log(result);
   const exist = await Category.findById(category )
   console.log(exist);
   exist.subcategories.push(result._id)
   exist.save()

    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.updateSubCategory = async (req, res) => {
  try {
    const id = req.params.id.trim();
    // Kategoriyani topish
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    const updatedFields = {};

    // Specify which fields can be updated
    const allowedFields = ["name"];

    // Iterate through the request body and only update allowed fields
    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        // Maydonlarni yangilash
        updatedFields[field] = req.body[field];
      }
    }

    // Kategoriyani yangilash
    for (const field in updatedFields) {
      category[field] = updatedFields[field];
    }

    const updatedCategory = await category.save();

    res.json(updatedCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.deleteSubCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedCategory = await Category.findOneAndDelete({ _id: id });

    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.getAllSubCategory = async (req, res) => {
  try {
    const categories = await subCategory.find()
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.getSingleSubCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await subCategory.find({category : id})

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.json(category);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};
