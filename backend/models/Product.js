const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  product_name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  isHot: {
    type: Number,
    default: 0,
  },
  isNew: {
    type: Boolean,
    default: false,
  },
  status: {
    type: Boolean,
    default: true,
  },
  star: {
    type: Number,
    default: 0,
  },
  inventory: {
    type: Number,
    required: true,
  },
  catalog_id: {
    type: String,
    required: true,
  },
  image: {
    type: [String],
    default: [],
  },
  color: {
    type: [String],
    default: [],
  },
  sold: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Product", ProductSchema);
