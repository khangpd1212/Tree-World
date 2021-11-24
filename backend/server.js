const express = require("express");

const {useRouter} = require("./routes");
const {configApp, connectDB} = require("./utils/config");

const app = express();

configApp(app)
connectDB();
useRouter(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`CORS-enabled web server listening on port ${PORT}`);
});
