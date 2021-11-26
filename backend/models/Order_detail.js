const mongoose = require("mongoose");

const OrderDetailSchema = new mongoose.Schema({
   id_order: {
      type: String,
      required: true,
   },
   id_product: {
      type: String,
      required: true,
   },
   quantity: {
      type: Number,
      required: true,
   },
   color: {
      type: String,
      required: true,
   },
});

module.exports = mongoose.model("Order_detail", OrderDetailSchema);
