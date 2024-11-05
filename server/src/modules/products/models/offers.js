import mongoose, { Schema, Document } from "mongoose";

const offerSchema = new mongoose.Schema({
  name: { type: String, required: true }
});

const Offers = mongoose.model("Offers", offerSchema);
export default Offers;
