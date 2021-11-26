const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDb is connected"))
    .catch((err) => console.log(err));
};

const configApp = (app) => {
  app
    .use(express.json({ limit: "25mb" }))
    .use(express.urlencoded({ limit: "25mb" }))
    .use(cors());
  dotenv.config();
};

module.exports = { configApp, connectDB };
