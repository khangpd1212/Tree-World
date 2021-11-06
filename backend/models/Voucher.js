const mongoose = require("mongoose");

const VoucherSchema = new mongoose.Schema({
   percent: {
      type: String,
      required: true,
   },
   createDate: {
      type: Date,
      required: true,
   },
   expiryDate: {
      type: Date,
      required: true,
   },
   maximum: {
      type: Number,
      required: true,
   },
   status: {
      type: Boolean,
      default: true,
   },
});

module.exports = mongoose.model("Voucher", VoucherSchema);
