const https = require("https");
const axios = require("axios");

exports.getWard = async (district_id) => {
  var config = {
    method: "GET",
    url: `https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${district_id}`,
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
exports.getProvince = async () => {
  var config = {
    method: "GET",
    url: `https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province`,
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
exports.getDistrict = async (province_id) => {
  var config = {
    method: "GET",
    url: `https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=${province_id}`,
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
