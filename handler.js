const { lessonsOfHN } = require("./src/lessonsOfHN");
const { writeToTelegram } = require("./src/writeToTelegram");

module.exports.run = async (event, context, callback) => {
  const time = new Date();
  console.log(`Your cron function "${context.functionName}" ran at ${time}`);

  try {
    const lesson = await lessonsOfHN();
    await writeToTelegram(lesson);
    callback(null, { success: true });
  } catch (e) {
    callback(e, { success: true });
  }
};
