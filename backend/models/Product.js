const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
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
      type: Buffer,
      required: false,
    },
    imageType: {
      type: String,
      required: false,
    },
  },
  {
    // the virtual field to be displayed on client side
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  }
);
ProductSchema.virtual("imagePath").get(function () {
  if (this.image != null && this.imageType != null) {
    return `data:${this.imageType};charset=utf-8;base64,${this.image.toString(
      "base64"
    )}`;
  }
});
module.exports = mongoose.model("Product", ProductSchema);
