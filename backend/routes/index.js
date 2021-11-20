const productRoute = require("./product");
const catalogRoute = require("./catalog");
const authRoute = require("./auth");
const paymentRoute = require("./payment");
const userRoute = require("./user");
const orderRoute = require("./order");
const orderDetailRoute = require("./order_detail");
const useRouter = (app) => {
    app
        .use("/auth", authRoute)
        .use("/product", productRoute)
        .use("/catalog", catalogRoute)
        .use("/payment", paymentRoute)
        .use("/user", userRoute)
        .use("/order", orderRoute)
        .use("./order_detail", orderDetailRoute)
}



module.exports = { useRouter };
