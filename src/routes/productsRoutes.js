const express = require("express");
const router = express.Router();
const { isAdmin } = require("../middleware/authorization");
const { authenticateUser } = require("../middleware/auth");
const { upload } = require("../utils/multer");
const productsController = require("../controller/products");

router.post("/", authenticateUser ,  isAdmin, upload.single('image') , productsController.createProduct);

router.put("/:id", authenticateUser, isAdmin, upload.single('image'), productsController.updateProduct);

router.delete("/:id",authenticateUser ,isAdmin, productsController.deleteProduct);

router.get("/count", productsController.getProductCount);

router.get("/featured/:count", productsController.getFeaturedProducts);

router.put("/gallery-images/:id" ,authenticateUser,isAdmin,upload.array("images", 10) ,productsController.uploadGalleryImages);

router.get("/", productsController.getAllProducts);

router.get("/:id", productsController.getProductById);

module.exports = router;
