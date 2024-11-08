import mongoose, { Schema, Document } from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true},
  key: { type: String, required: true },
});

const Products = mongoose.model("Products", productSchema);
export default Products;
