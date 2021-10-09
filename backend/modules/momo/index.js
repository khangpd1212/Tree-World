const https = require('https');
const { getSign } = require("./getSign");

const payment = async (amount, extraData, orderId, orderInfo) => {
    const data = getSign(amount, extraData, orderId, orderInfo)

    const options = {
        hostname: 'test-payment.momo.vn',
        port: 443,
        path: '/v2/gateway/api/create',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(JSON.stringify(data))
        }
    }
    const req = https.request(options, res => {
        res.setEncoding('utf8');
        res.on('data', (body) => {
            console.log('payUrl: ');
            console.log(JSON.parse(body).payUrl);
            return JSON.parse(body).payUrl
        });
        res.on('end', () => {
            console.log('end request.');
        });
    })
    
    req.on('error', (e) => {
        console.log(`error payment: ${e.message}`);
    });

    console.log("Sending....")
    req.write(JSON.stringify(data));
    req.end();
}
