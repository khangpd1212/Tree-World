const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  idProduct: {
    type: String,
    required: true,
  },
  idUser: {
    type: String,
    required: true,
  },
  nameUser: {
    type: String,
    required: true,
  },
  star: {
    type: Number,
    default: 0,
  },
  content: {
    type: String,
    default: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  status: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Comment", CommentSchema);
