const https = require("https");
const axios = require("axios");

exports.getFee = async (province, district, address, ward, weight, transport) => {
   var config = {
      method: "GET",
      url: "https://services.giaohangtietkiem.vn/services/shipment/fee",
      headers: {
         "Content-Type": "application/json",
         Token: process.env.FEE_TOKEN,
      },
      data: {
         pick_address_id: 14930287,
         province: province,
         district: district,
         address: address,
         ward: ward,
         weight: 1000,
         transport: "fly",
         deliver_option: "xteam",
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