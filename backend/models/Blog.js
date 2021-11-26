const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  create_date: {
    type: Date,
    default: Date.now(),
  },
  id_user: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Blog", BlogSchema);
