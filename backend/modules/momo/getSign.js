const crypto = require('crypto');

const getSign = (
    amount,
    extraData,
    orderId,
    orderInfo
) => {
    const partnerCode = "MOMO";
    const redirectUrl = "https://momo.vn/return";
    const ipnUrl = "https://callback.url/notify";
    const requestType = "captureWallet";
    const requestId = partnerCode + new Date().getTime();
    const accessKey = "F8BBA842ECF85"
    const scretKey = "K951B6PE1waDMi640xX08PD3vg6EkVlz"
    if (amount && extraData) {
        const rawSignature =
            "accessKey=" + accessKey
            + "&amount=" + amount
            + "&extraData=" + extraData
            + "&ipnUrl=" + ipnUrl
            + "&orderId=" + orderId
            + "&orderInfo=" + orderInfo
            + "&partnerCode=" + partnerCode
            + "&redirectUrl=" + redirectUrl
            + "&requestId=" + requestId
            + "&requestType=" + requestType

        const signature = crypto.createHmac('sha256', scretKey)
            .update(rawSignature)
            .digest('hex');

        return {
            signature,
            partnerCode: partnerCode,
            accessKey: process.env.MOMO_ACCESS_KEY,
            requestId: requestId,
            amount: amount,
            orderId: orderId,
            orderInfo: orderInfo,
            redirectUrl: redirectUrl,
            ipnUrl: ipnUrl,
            extraData: extraData,
            requestType: requestType,
            lang: 'en'
        }
    }
    return new Error("sign error!!");
}

module.exports = { getSign };