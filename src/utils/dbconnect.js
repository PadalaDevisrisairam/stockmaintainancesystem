import mongoose from "mongoose";

const MONGO_URI = "mongodb+srv://Devisri123:devi+123@cluster0.vduzx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const dbconnect = async () => {
  
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
  }
};

export default dbconnect;
