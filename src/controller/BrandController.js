const brand = require("../models/Brand")

exports.createBrand = async (req, res) => {
  try {
    const { name } = req.body;
    const existingBrand = await brand.findOne({ name });

    if (existingBrand) {
      return res.status(400).json({ error: "Brand with this name already exists" });
    }

    const newBrand = await brand.create({
      name,
    });

    res.status(201).json(newBrand);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Update a subcategory by ID
exports.updateBrand = async (req, res) => {
  try {
    const id = req.params.id.trim();

    // Validate input
    if (!id) {
      return res.status(400).json({ error: "Brand ID is required" });
    }

    // Find the brand by ID
    const brand = await Brand.findById(id);

    if (!brand) {
      return res.status(404).json({ error: "Brand not found" });
    }

    // Update brand fields
    const { name } = req.body;
    if (name) {
      brand.name = name;
    }

    // Save the updated brand
    const updatedBrand = await brand.save();

    res.json(updatedBrand);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Delete a subcategory by ID
exports.deleteBrand = async (req, res) => {
  try {
    const id = req.params.id;

    // Validate input
    if (!id) {
      return res.status(400).json({ error: "Brand ID is required" });
    }

    // Find and delete the brand by ID
    const deletedBrand = await Brand.findByIdAndDelete(id);

    if (!deletedBrand) {
      return res.status(404).json({ error: "Brand not found" });
    }

    res.json({ message: "Brand deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Get all subcategories
exports.getAllBrands = async (req, res) => {
  try {
    const brands = await Brand.find();
    res.json(brands);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Get a single subcategory by ID
exports.getSingleBrand = async (req, res) => {
  try {
    const id = req.params.id;

    // Validate input
    if (!id) {
      return res.status(400).json({ error: "Brand ID is required" });
    }

    const brand = await brand.findById(id);

    if (!brand) {
      return res.status(404).json({ error: "Brand not found" });
    }

    res.json(brand);
  } catch (error) {
    console.error(error);
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};