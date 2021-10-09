const crypto = require('crypto');

const getSign = (
    amount,
    extraData,
    orderId,
    orderInfo
) => {
    const partnerCode = "MOMO";
    const redirectUrl = "https://treeword.net/return";
    const ipnUrl = "https://treeword.net/notify";
    const requestType = "captureWallet";
    const requestId = partnerCode + new Date().getTime();
    const accessKey = process.env.MOMO_ACCESS_KEY;
    const scretKey = process.env.MOMO_SCRETKEY;
    
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
            console.log(signature);

        return {
            signature,
            partnerCode: partnerCode,
            accessKey,
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