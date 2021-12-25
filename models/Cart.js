const mongoose = require('mongoose');

const product = {
  product: { type: String },
  quantity: { type: Number, default: 1 },
};

const cartSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [product],
  },
  { timestamps: true }
);

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;
