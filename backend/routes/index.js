const productRoute = require("./product");
const catalogRoute = require("./catalog");
const authRoute = require("./auth");
const paymentRoute = require("./payment");
const addressRoute = require("./address");
const userRoute = require("./user");
const feeRoute = require("./fee");
const useRouter = (app) => {
    app
        .use("/auth", authRoute)
        .use("/product", productRoute)
        .use("/catalog", catalogRoute)
        .use("/payment", paymentRoute)
        .use("/user", userRoute)
        .use("/address", addressRoute)
        .use("/fee", feeRoute)
}



module.exports = { useRouter };
