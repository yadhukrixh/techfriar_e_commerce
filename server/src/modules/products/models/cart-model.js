import mongoose, { Schema } from "mongoose";

const cartSchema = new Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Products",
    default: null,
  },
  count: {
    type: Number,
    default: false,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
});


const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
