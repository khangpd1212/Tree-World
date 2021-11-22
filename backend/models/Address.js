const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema({
   idUser: {
      type: String,
      required: true,
   },
   content: {
      type: String,
      required: true,
   },
   district_id: {
      type: Number,
      required: true,
   },
   ward_code: {
      type: Number,
      required: true,
   }
});

module.exports = mongoose.model("Address", AddressSchema);