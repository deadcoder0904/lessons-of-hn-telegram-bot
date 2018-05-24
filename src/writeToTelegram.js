const axios = require("axios");

const { BOT_API_KEY, CHANNEL_ID } = process.env;

const ENDPOINT = `https://api.telegram.org/bot${BOT_API_KEY}/sendMessage`;

module.exports.writeToTelegram = text =>
  axios({
    method: "get",
    url: ENDPOINT,
    data: {
      chat_id: CHANNEL_ID,
      parse_mode: "markdown",
      disable_web_page_preview: true,
      text
    }
  });
