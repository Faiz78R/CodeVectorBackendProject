import mongoose from "mongoose";
const productSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  category: {
    type: String,
    required: true
  },

  price: {
    type: Number,
    required: true
  },

  
},{timestamps:{createdAt:"created_at",updatedAt:"updated_at"}});

// Indexes for faster queries

productSchema.index({
  createdAt: -1
});

productSchema.index({
  category: 1
});

productSchema.index({
  category: 1,
  createdAt: -1
});

const Product = mongoose.model( "Product", productSchema)

export default Product;