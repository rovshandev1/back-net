const express = require("express");
const router = express.Router();
const profileController = require("../controller/profileController");
const { authenticateUser } = require("../middleware/auth");
const { upload } = require("../utils/multer");


router.post(
  "/",
  authenticateUser, 
  upload .single('profileImage') ,
  profileController.createProfile
);

router.get("/:userId", authenticateUser, profileController.getProfile);

router.put("/", authenticateUser,  upload .single('profileImage') , profileController.updateProfile);

router.delete("/", authenticateUser, profileController.deleteProfile);

module.exports = router;
