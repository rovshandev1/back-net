const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middleware/auth");
const { isAdmin } = require("../middleware/authorization");
const { getSingleSubCategory, createSubCategory, getAllSubCategory, updateSubCategory, deleteSubCategory } = require("../controller/subcategoryController");

router.post("/", authenticateUser, isAdmin, createSubCategory);

router.put("/:id", authenticateUser, isAdmin, updateSubCategory);

router.delete("/:id", authenticateUser, isAdmin, deleteSubCategory);

router.get("/", authenticateUser, isAdmin, getAllSubCategory);

router.get("/:id", authenticateUser, isAdmin, getSingleSubCategory);


module.exports = router;