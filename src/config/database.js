const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://sardorbekmusilman:Just_password03@cluster0.ysxkkxu.mongodb.net/sello', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDBga muvaffaqiyatli ulanildi');
  } catch (error) {
    console.error('MongoDBga ulanishda xatolik:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
