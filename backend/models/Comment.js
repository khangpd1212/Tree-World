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
    imageProduct: {
        type: String,
        required: true,
    },
    star: {
        type: Number,
        default: true,
    },
    content: {
        type: String,
        default: true,
    },
    date: {
        type: Date,
        default: true,
    },
    status: {
        type: Boolean,
        default: true,
    },
});

module.exports = mongoose.model("Comment", CommentSchema);