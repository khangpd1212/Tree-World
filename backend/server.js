//modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
//routes
const testRoute = require("./routes/test");
const productRoute = require("./routes/product");

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

app.use("/", testRoute);
app.use("/product", productRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`CORS-enabled web server listening on port ${PORT}`);
});
