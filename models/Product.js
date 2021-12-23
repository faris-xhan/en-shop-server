const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: { type: String, require: true, unique: true },
  categories: { type: Array, require: true },
  price: { type: String, require: true },
  color: { type: String, require: true },
  desc: { type: String, require: true },
  size: { type: String, require: true },
  img: { type: String, require: true },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
