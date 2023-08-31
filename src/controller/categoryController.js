const Category = require("../models/category");

exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ error: "Bunday katalog mavjud" });
    }

    const category = new Category({
      name,
    });

    const newCategory = await category.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const id = req.params.id.trim();

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
        updatedFields[field] = req.body[field];
      }
    }

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

exports.deleteCategory = async (req, res) => {
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

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate([
      { path: "subcategories", select: "name -_id" },
    ]);
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.getSingleCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await Category.findById(id).populate([
      { path: "subcategories", select: "name" },
    ]);
    console.log(category);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.json(category);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};
