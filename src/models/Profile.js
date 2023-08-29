const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      unique: true,
    },
    username: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      maxLength: 250,
    },
    profileImage: {
      type: String,
    },
    gender: {
      type: String,
      default: "other",
    },
  },
  {
    timestamps: true,
  }
);

profileSchema.index({ user: 1 }, { unique: true });

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
