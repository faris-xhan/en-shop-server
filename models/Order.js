const mongoose = require("mongoose");

const product = {
  product: { type: String },
  quantity: { type: Number, default: 1 },
};

const orderSchema = new mongoose.Schema(
  {
    status: { type: String, default: "Pending" },
    userId: { type: String, required: true },
    address: { type: Object, require: true },
    amount: { type: Number, require: true },
    products: [product],
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
