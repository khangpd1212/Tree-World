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
  create_date: {
    type: Date,
    default: Date.now,
  },
  update_date: {
    type: Date,
    default: null,
  },
  isHot: {
    type: Boolean,
    default: false,
  },
  isNew: {
    type: Boolean,
    default: false,
  },
  status: {
    type: Boolean,
    default: true,
  },
  view: {
    type: Number,
    default: 0,
  },
  catalog_id: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Product", ProductSchema);
