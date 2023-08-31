const Product = require("../models/product");
const subcategory = require("../models/subCategory");
const mongoose = require("mongoose");

// Create a new Product
exports.createProduct = async (req, res) => {
  try {
    const exactSubcategory = await subcategory.findById(req.body.subcategory);

    if (!exactSubcategory) return res.status(400).send("Invalid Category");

    let product = await Product.create({
      image: req.file.filename,
      ...req.body,
    });

    const newProduct = await product.save();

    console.log(newProduct);

    exactSubcategory.products.push(newProduct.id);

    exactSubcategory.save();

    console.log(exactSubcategory);
    if (!product) return res.status(500).send("The product cannot be created");

    res.send(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Update a Product by ID
exports.updateProduct = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send("Invalid Product Id");
    }

    const exactSubcategory = await subcategory.findById(req.body.subcategory);

    if (!exactSubcategory) return res.status(400).send("Invalid Subcategory");

    // Create an object to hold the updated product data
    const updatedProductData = {
      ...req.body,
      subcategory: exactSubcategory._id, // Associate the product with the subcategory
    };

    // Check if an image file is included in the request
    if (req.file) {
      updatedProductData.image = req.file.filename;
    }

    // Update the product by its ID with the provided data
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updatedProductData,
      { new: true }
    );

    if (!product) return res.status(404).send("Product not found");

    res.send(product);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Delete a Product by ID
exports.deleteProduct = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send("Invalid Product Id");
    }

    const product = await Product.findByIdAndRemove(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    
    const exactSubcategory = await subcategory.findById(product.subcategory);
    if (exactSubcategory) {
      exactSubcategory.products.pull(product._id);
      await exactSubcategory.save();
    }

    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Get the count of all products
exports.getProductCount = async (req, res) => {
  try {
    const productCount = await Product.countDocuments();

    res.send({ productCount });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Get featured Products
exports.getFeaturedProducts = async (req, res) => {
  try {
    const count = req.params.count ? req.params.count : 0;
    const products = await Product.find({ isFeatured: true }).limit(+count);

    res.send(products);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.uploadGalleryImages = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send("Invalid Product Id");
    }
    const files = req.files;
    let imagesPaths = [];
    const basePath = `${req.protocol}://${req.get("host")}/src/uploads/`;

    if (files) {
      files.map((file) => {
        imagesPaths.push(`${basePath}${file.filename}`);
      });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        images: imagesPaths,
      },
      { new: true }
    );

    if (!product) return res.status(404).send("Product not found");

    res.send(product);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Get all Products
exports.getAllProducts = async (req, res) => {
  try {
    const {
      q,
      page = { limit: 15, offset: 0 },
      sort = { by: "title", order: "desc" },
      price = { min: 0, max: 3000000 },
    } = req.query;
    const filter = {};

    if (q) {
      filter.title = { $regex: new RegExp(q, "i") };
      // filter.price = { $gte: price.min, $lte: price.max };
    }
    if (price) {
      filter.price = { $gte: price.min, $lte: price.max };
    }

    const result = await Product.find({ ...filter })
      .sort({ [sort.by]: sort.order })
      .skip(page.offset)
      .limit(page.limit);

    res.json({ list: result, pageInfo: { ...page }, priceInfo: { ...price } });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Get a single Products by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.send(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};
