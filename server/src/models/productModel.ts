import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  quantity: {
    type: Number,
  },
  price: {
    type: Number,
  }
});

module.exports = mongoose.model("Product", productSchema, "Products");
