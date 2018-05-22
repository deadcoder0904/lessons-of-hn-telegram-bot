const { lessonsOfHN } = require("./src/lessonsOfHN");
const { writeToTelegram } = require("./src/writeToTelegram");

module.exports.run = async (event, context) => {
  const time = new Date();
  const lesson = await lessonsOfHN();
  writeToTelegram(lesson);
  console.log(`Your cron function "${context.functionName}" ran at ${time}`);
};