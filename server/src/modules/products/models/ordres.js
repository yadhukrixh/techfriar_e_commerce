import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Products",
    default: null,
  },
  totalAmount: {
    type: Number,
    default: false,
  },
  discountedAmount: {
    type: Number,
    default: false,
  },
  payableAmount: {
    type: Number,
    default: false,
  },
  productIds: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Products",
    default: null,
  },
  offerIds: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Offers",
    default: null,
  },
  status: {
    type:String,
    required: true
  }
});


const Order = mongoose.model("Order", orderSchema);
export default Order;
