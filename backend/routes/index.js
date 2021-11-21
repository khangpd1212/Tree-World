const productRoute = require("./product");
const catalogRoute = require("./catalog");
const authRoute = require("./auth");
const paymentRoute = require("./payment");
const userRoute = require("./user");
const voucherRoute = require("./voucher");
const commentRoute = require("./comment");
const orderRoute = require("./order");
const orderDetailRoute = require("./order_detail");
const useRouter = (app) => {
    app
        .use("/voucher", voucherRoute)
        .use("/auth", authRoute)
        .use("/product", productRoute)
        .use("/catalog", catalogRoute)
        .use("/payment", paymentRoute)
        .use("/user", userRoute)
        .use("/comment", commentRoute)
        .use("/order", orderRoute)
        .use("/order_detail", orderDetailRoute)
}



module.exports = { useRouter };
