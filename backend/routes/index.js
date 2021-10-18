const productRoute = require("./product");
const catalogRoute = require("./catalog");
const authRoute = require("./auth");
const paymentRoute = require("./payment");
const userRoute = require("./user");
const useRouter = (app) => {
    app
        .use("/auth", authRoute)
        .use("/product", productRoute)
        .use("/catalog", catalogRoute)
        .use("/payment", paymentRoute)
        .use("/user", userRoute)
}

module.exports = { useRouter }