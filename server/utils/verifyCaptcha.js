const axios = require("axios");

const verifyCaptcha = async (token) => {
  const secret = process.env.RECAPTCHA_SECRET;
  const url = `https://www.google.com/recaptcha/api/siteverify`;

  const res = await axios.post(
    url,
    new URLSearchParams({ secret, response: token })
  );

  return res.data.success;
};

module.exports = verifyCaptcha;
