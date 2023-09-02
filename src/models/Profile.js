const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  user: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
    required: true,
  },
  bio: {
    type: String,
  },
  profileImage: {
    type: String,
  },
  username: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
});

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
