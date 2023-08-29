const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Register
exports.registerUser = async (req, res) => {
  const { name, email, password, isAdmin } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        error: "Ushbu email bilan foydalanuvchi allaqachon ro'yhatdan o'tgan",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ email, password: hashedPassword, name });

    if (isAdmin) {
      user.role = "admin";
      user.isEmailVerified = true;
    }

    await user.save();

    res
      .status(201)
      .json({ message: "Foydalanuvchi muvaffaqiyatli ro'yhatdan o'tdi" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Xatolik yuz berdi" });
  }
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "Foydalanuvchi topilmadi" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ error: "Noto'g'ri parol" });
    }


    const obj ={
      userId : user._id ,

    }
    if(user.role){
      obj.role = 'admin'
    }else{
      obj.role ='user'
    }
    const token = jwt.sign(obj , process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Xatolik yuz berdi" });
  }
};

exports.confirmEmail = async (req, res) => {
  const { email, token } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "Bu email allaqachon tasdiqlangan" });
    }

    if (token !== user.token) {
      return res.status(401).json({ error: "Noto'g'ri tasdiq kodi" });
    }

    if (user.isEmailConfirmed) {
      return res.json({ message: "Bu email allaqachon tasdiqlangan" });
    }

    user.isEmailConfirmed = true;
    await user.save();

    res.json({ message: "Email muvaffaqiyatli tasdiqlandi" });
  } catch (error) {
    res.status(500).json({ error: "Serverda xatolik yuz berdi" });
  }
};
