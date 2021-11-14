const https = require("https");
const axios = require("axios");

exports.getAddress = async (district_id) => {
  var config = {
    method: "GET",
    url: "https://provinces.open-api.vn/api/?depth=3",
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
