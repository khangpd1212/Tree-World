//modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
//routes
const productRoute = require("./routes/product");
const catalogRoute = require("./routes/catalog");
const authRoute = require("./routes/auth");

const app = express();
//bodyParser middlewares
app.use(express.json());
//config .env
dotenv.config();
//connect mongoDb HTTP CORS
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDb is connected"))
  .catch((err) => console.log(err));

// enable CORS requests
app.use(cors());

app.use("/auth", authRoute);
app.use("/product", productRoute);
app.use("/catalog", catalogRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`CORS-enabled web server listening on port ${PORT}`);
});
