const axios = require("axios");

const { lessonsOfHN } = require("./src/lessonsOfHN");

exports.run = async (event, context) => {
  const time = new Date();
  console.log(`Your cron function "${context.functionName}" ran at ${time}`);

  const lesson = await lessonsOfHN();
  const ENDPOINT = `https://api.telegram.org/bot${
    process.env.BOT_API_KEY
  }/sendMessage`;

  await axios({
    method: "get",
    url: ENDPOINT,
    data: {
      chat_id: process.env.CHANNEL_ID,
      parse_mode: "markdown",
      disable_web_page_preview: true,
      text: lesson
    }
  });

  return { lesson, success: true };
};
