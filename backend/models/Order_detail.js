const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
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
   }
});

module.exports = mongoose.model("Order_detail", OrderSchema);
