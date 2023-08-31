const Category = require("../models/category");
const subCategory = require("../models/subCategory");

// Create a subcategory
exports.createSubCategory = async (req, res) => {
  try {
    const { name, categoryId } = req.body;
    const existingCategory = await subCategory.findOne({ name });

    if (existingCategory) {
      return res.status(400).json({ error: "Bunday katalog mavjud" });
    }

    const result = await subCategory.create({
      name,
    });

    console.log(result);

    console.log(Category);

    const exist = await Category.findById(categoryId);
    console.log(exist);

    exist.subcategories.push(result._id);
    exist.save();

    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Update a subcategory by ID
exports.updateSubCategory = async (req, res) => {
  try {
    const id = req.params.id.trim();

    // Validate input
    if (!id) {
      return res.status(400).json({ error: "Subcategory ID is required" });
    }

    // Find the subcategory by ID
    const subcategory = await subCategory.findById(id);

    if (!subcategory) {
      return res.status(404).json({ error: "Subcategory not found" });
    }

    // Update subcategory fields
    const { name } = req.body;
    if (name) {
      subcategory.name = name;
    }

    // Save the updated subcategory
    const updatedSubcategory = await subcategory.save();

    res.json(updatedSubcategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Delete a subcategory by ID
exports.deleteSubCategory = async (req, res) => {
  try {
    const id = req.params.id;

    // Validate input
    if (!id) {
      return res.status(400).json({ error: "Subcategory ID is required" });
    }

    // Find and delete the subcategory by ID
    const deletedSubcategory = await subCategory.findByIdAndDelete(id);

    if (!deletedSubcategory) {
      return res.status(404).json({ error: "Subcategory not found" });
    }

    // Remove the subcategory ID from the parent category's subcategories array
    const parentCategory = await Category.findOne({ subcategories: id });

    if (parentCategory) {
      parentCategory.subcategories = parentCategory.subcategories.filter(
        (categoryId) => categoryId.toString() !== id
      );

      await parentCategory.save();
    }

    res.json({ message: "Subcategory deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Get all subcategories
exports.getAllSubCategory = async (req, res) => {
  try {
    const categories = await subCategory.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Get a single subcategory by ID
exports.getSingleSubCategory = async (req, res) => {
  try {
    const id = req.params.id;

    // Validate input
    if (!id) {
      return res.status(400).json({ error: "Subcategory ID is required" });
    }

    const subcategory = await subCategory.findById(id);

    if (!subcategory) {
      return res.status(404).json({ error: "Subcategory not found" });
    }

    res.json(subcategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
