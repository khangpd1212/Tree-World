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

ProductSchema.index(
  { product_name: "text", description: "text" },
  {
    weights: { product_name: 5, description: 3 },
  }
);
ProductSchema.statics = {
  searchPartial: function (q, callback) {
    return this.find(
      {
        $or: [
          { product_name: new RegExp(q, "gi") },
          { description: new RegExp(q, "gi") },
        ],
      },
      callback
    );
  },
  searchFull: function (q, callback) {
    return this.find(
      {
        $text: { $search: q, $caseSensitive: false },
      },
      callback
    );
  },
  search: function (q, callback) {
    this.searchFull(q, (err, data) => {
      if (err) return callback(err, data);
      if (!err && data.length) return callback(err, data);
      if (!err && data.length === 0) return this.searchPartial(q, callback);
    });
  },
};

module.exports = mongoose.model("Product", ProductSchema);
