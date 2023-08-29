const express = require("express");
const router = express.Router();
const { isAdmin } = require("../middleware/authorization");
const productsController = require("../controller/products");
const { upload } = require("../utils/multer");
const { authenticateUser } = require("../middleware/auth");

router.get("/", productsController.getAllProducts);
router.get("/:id", productsController.getProductById);
router.post("/", authenticateUser ,  isAdmin, upload.single('image') , productsController.createProduct);
router.put("/:id", isAdmin, productsController.updateProduct);
router.delete("/:id", isAdmin, productsController.deleteProduct);
router.get("/count", productsController.getProductCount);
router.get("/featured/:count", productsController.getFeaturedProducts);
router.put(
  "/gallery-images/:id",
  isAdmin,
  productsController.uploadGalleryImages
);

module.exports = router;
