const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: { type: String, require: true, unique: true },
  price: { type: Number, require: true },
  desc: { type: String, require: true },
  img: { type: String, require: true },
  categories: { type: Array },
  color: { type: String },
  size: { type: String },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
