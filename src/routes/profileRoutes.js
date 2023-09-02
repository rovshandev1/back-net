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

router.put("/", authenticateUser,  upload .single('profileImage') , profileController.updateProfile);

router.delete("/", authenticateUser, profileController.deleteProfile);

router.get("/", authenticateUser, profileController.getProfile);

module.exports = router;
