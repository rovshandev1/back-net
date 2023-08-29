const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middleware/auth");
const { isAdmin } = require("../middleware/authorization");
const Category = require("../controller/categoryController");
const { getSingleSubCategory, createSubCategory, getAllSubCategory } = require("../controller/subcategoryController");

router.post("/subcategory", authenticateUser, isAdmin, createSubCategory);
router.get("/subcategory/", authenticateUser, isAdmin, getAllSubCategory);
router.get("/subcategory/:id", authenticateUser, isAdmin, getSingleSubCategory);



module.exports = router;