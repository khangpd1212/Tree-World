const https = require('https');
var axios = require('axios');
const { getSign } = require("./getSign");

const payment = async (amount, extraData, orderId, orderInfo) => {
    const dataSign = getSign(amount, extraData, orderId, orderInfo)

    var config = {
        method: 'post',
        url: 'https://test-payment.momo.vn/v2/gateway/api/create',
        headers: {
            'Content-Type': 'application/json'
        },
        data: dataSign
    };
    
    const result = await axios(config)
        .then(function ({data}) {
            return data
        })
        .catch(function (error) {
            return error.message
        });
    return result
}


module.exports = { payment }