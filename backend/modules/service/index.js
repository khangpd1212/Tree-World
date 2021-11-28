const https = require("https");
const axios = require("axios");

exports.getService = async (to_district) => {
   var config = {
      method: "GET",
      url: `https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/available-services?shop_id=${83104}&from_district=${1447}&to_district=${to_district}`,
      headers: {
         "Content-Type": "application/json",
         Token: process.env.ADDRESS_TOKEN,
      },
   };
   const result = await axios(config)
      .then(function ({ data }) {
         return data;
      })
      .catch(function (error) {
         return error.message;
      });
   return result;
};