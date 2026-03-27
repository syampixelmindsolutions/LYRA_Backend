import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  brand: String,
  category: String,
  price: Number,
  originalPrice: Number,
  description: String,
  image: String,
  images: [String],
  sizes: [String],
  colors: [String],
  gender: String,
  badge: String,
  rating: { type: Number, default: 4 },
  reviews: { type: Number, default: 0 },
}, { timestamps: true });


const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
