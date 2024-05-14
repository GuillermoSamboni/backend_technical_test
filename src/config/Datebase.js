const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const db = await mongoose.connect(
      `${process.env.URL_DATABASE}/${process.env.DATABASE_NAME}`
    );
    console.log("Database connected successfully");
    return db;
  } catch (error) {
    console.error("Error connecting to database:", error.message);
    throw error;
  }
};

module.exports = connectDb();
