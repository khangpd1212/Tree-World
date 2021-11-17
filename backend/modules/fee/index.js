const axios = require("axios");

exports.getFee = async (service_id, to_district_id, to_ward_code) => {
   var config = {
      method: "GET",
      // url: "https://services.giaohangtietkiem.vn/services/shipment/fee",
      url: `https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee?service_id=${service_id}&to_district_id=${to_district_id}&to_ward_code=${to_ward_code}`,
      headers: {
         "Content-Type": "application/json",
         Token: process.env.ADDRESS_TOKEN,
      },
      data: {
         "from_district_id": 1447,
         "height": 50,
         "length": 20,
         "weight": 200,
         "width": 20,
         "insurance_value": 10000,
         "coupon": null
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