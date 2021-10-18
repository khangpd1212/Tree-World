const https = require("https");
const axios = require("axios");

exports.getProvince = async () => {
  var config = {
    method: "GET",
    url: "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province",
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
    url: "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district",
    headers: {
      "Content-Type": "application/json",
      Token: process.env.ADDRESS_TOKEN,
    },
    data: {
      province_id: province_id,
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

exports.getWard = async (district_id) => {
  var config = {
    method: "GET",
    url: "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward",
    headers: {
      "Content-Type": "application/json",
      Token: process.env.ADDRESS_TOKEN,
    },
    data: {
      district_id: district_id,
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
