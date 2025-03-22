import mongoose from "mongoose";

const customerschema = new mongoose.Schema({
  username: { type: String, required: true },
  phone: { type: Number, required: true },
  password: { type: String, required: true },
  confirmpassword:{type:String,required:true},
  role:{type:String,required:true,default:"customer"}
});

export default mongoose.models.customers || mongoose.model("customers", customerschema);
