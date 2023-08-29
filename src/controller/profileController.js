const Profile = require("../models/Profile");

exports.createProfile = async (req, res) => {
  try {
    const { bio, website } = req.body;
    const file = req.file;

    // console.log(req.user);
    const { userId } = req.user;
    console.log(userId);
    const exist = await Profile.findOne({ user: userId });
    if (exist) {
      return res.status(403).json("profile already exists");
    }
    const profile = new Profile({
      user: req.user.userId, // Foydalanuvchi ID sini olish
      bio,
      website,
      profileImage: file.filename, // Base64-kodlangan rasm ma'lumotini string sifatida saqlash
    });

    // Profilni saqlash
    await profile.save();

    res.status(201).json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server xatosi" });
  }
};

// Profilni yangilash funktsiyasi
exports.updateProfile = async (req, res) => {
  try {
    const { userId } = req.user;

    const { bio, website } = req.body;
    const file = req?.file;
    const updatedProfile = {
      bio,
      website,
    };

    if (file) {
      updatedProfile.profileImage = file.filename;
    }

    const profile = await Profile.findOneAndUpdate(
      { user: userId },
      updatedProfile,
      { new: true }
    );

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Profilni o'chirish funktsiyasi
exports.deleteProfile = async (req, res) => {
  try {
    const userId = req.user.userId;

    const deletedProfile = await Profile.findOneAndRemove({ user: userId });

    if (!deletedProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json({ message: "Profile deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Profilni olish funktsiyasi
exports.getProfile = async (req, res) => {
  try {
    const userId = req.params.userId;

    const profile = await Profile.findOne({ user: userId });

    if (!profile) {
      return res.status(404).json({ message: "Profil topilmadi" });
    }

    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
