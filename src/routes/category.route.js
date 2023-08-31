const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middleware/auth");
const { isAdmin } = require("../middleware/authorization");
const Category = require("../controller/categoryController");

router.post("/", authenticateUser, isAdmin, Category.createCategory);

router.put("/:id", authenticateUser, isAdmin, Category.updateCategory);

router.delete("/:id", authenticateUser, isAdmin, Category.deleteCategory);

router.get("/", authenticateUser, Category.getAllCategories);

router.get("/:id", authenticateUser, Category.getSingleCategory);

module.exports = router;
