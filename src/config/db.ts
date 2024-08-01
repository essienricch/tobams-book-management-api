import mongoose  from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

let url = process.env.DB_URL;
if (!url) {
    throw new Error('DB_URL environment variable is not defined');
  }
  
const connectDB = async () => {
  try {
    console.log(url);
    await mongoose.connect(url, {connectTimeoutMS: 30000});
    console.log("MongoDB successfully connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};



module.exports = connectDB;

