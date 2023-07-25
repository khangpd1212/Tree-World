const mongoose = require('mongoose');

const CatalogSchema = new mongoose.Schema({
  catalog_name: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  slug: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Catalog', CatalogSchema);
