import mongoose from "mongoose";

const MONGO_URI = "mongodb://localhost:27017/StockMaintainanceSystem";

const dbconnect = async () => {
  
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
  }
};

export default dbconnect;
