const isAdmin = require("../middleware/authorization");
const  Product = require("../models/Product");
const Category = require("../models/category");
const mongoose = require("mongoose");
const multer = require("multer");

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.split(" ").join("-");
    const extension = FILE_TYPE_MAP[file.mimetype];
    cb(null, `${fileName}-${Date.now()}.${extension}`);
  },
});

const uploadOptions = multer({ storage: storage });

exports.getAllProducts = async (req, res) => {
  try {
    let filter = {};
    if (req.query.categories) {
      filter = { category: req.query.categories.split(",") };
    }

    const productList = await Product.find(filter).populate("category");

    if (!productList) {
      return res.status(500).json({ success: false });
    }
    res.send(productList);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category");

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.send(product);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.createProduct = uploadOptions.single("image"), async (req, res) => {
  try {
    const category = await Category.findById(req.body.category);
    if (!category) return res.status(400).send("Invalid Category");

    // const file = req.file;
    console.log(req.file);
    // if (!file) return res.status(400).send("No image in the request");

    // const fileName = file.filename;
    const basePath = `${req.protocol}://${req.get("host")}/src/uploads/`;
    let product = new Product({
      image: req.file.filename,
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      discount: req.body.discount,
      rating: req.body.rating,
      likes: req.body.likes,
      features: req.body.features,
      category: req.body.category,
      brand: req.body.brand,
      isNew: req.body.isNew,
    });

    product = await product.save();

    if (!product) return res.status(500).send("The product cannot be created");

    res.send(product);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send("Invalid Product Id");
    }
    const category = await Category.findById(req.body.category);
    if (!category) return res.status(400).send("Invalid Category");

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        image: req.body.image,
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        discount: req.body.discount,
        rating: req.body.rating,
        likes: req.body.likes,
        features: req.body.features,
        category: req.body.category,
        brand: req.body.brand,
        isNew: req.body.isNew,
      },
      { new: true }
    );

    if (!product) return res.status(404).send("Product not found");

    res.send(product);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.deleteProduct =  async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send("Invalid Product Id");
    }

    const product = await Product.findByIdAndRemove(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.getProductCount = async (req, res) => {
  try {
    const productCount = await Product.countDocuments();

    res.send({ productCount });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.getFeaturedProducts = async (req, res) => {
  try {
    const count = req.params.count ? req.params.count : 0;
    const products = await Product.find({ isFeatured: true }).limit(+count);

    res.send(products);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.uploadGalleryImages =
  uploadOptions.array("images", 10),
  async (req, res) => {
    try {
      if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send("Invalid Product Id");
      }
      const files = req.files;
      let imagesPaths = [];
      const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;

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
  }
;
