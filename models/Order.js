const mongoose = require("mongoose");

const product = {
  product: { type: String },
  quantity: { type: Number, default: 1 },
};

const orderSchema = new mongoose.Schema(
  {
    status: { type: String, default: "Pending" },
    userId: { type: String, required: true },
    address: { type: Object, required: true },
    amount: { type: Number, required: true },
    products: [product],
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
