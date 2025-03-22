import mongoose from "mongoose";

const productschema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: String, required: true }
});

export default mongoose.models.products || mongoose.model("products", productschema);
