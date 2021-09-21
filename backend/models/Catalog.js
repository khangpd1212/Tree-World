const mongoose = require("mongoose");

const CatalogSchema = new mongoose.Schema({
  catalog_name: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Catalog", CatalogSchema);
