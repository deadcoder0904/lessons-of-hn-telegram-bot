const Parser = require("rss-parser");
const parser = new Parser();
const htmlToText = require("html-to-text");
const cheerio = require("cheerio");
const convertToSpaces = require("convert-to-spaces");
const trimNewlines = require("trim-newlines");

const LESSONS_OF_HN_FEED =
  "https://us9.campaign-archive.com/feed?u=383e62709f4ac9e20d7d19b59&id=9415e4492e&num=100";

const replaceNewlineWithSpace = val =>
  val.replace(/(\r\n|\n|\r|\t|&nbsp;)/gm, " ");

module.exports.lessonsOfHN = async () => {
  let feed = await parser.parseURL(LESSONS_OF_HN_FEED);
  const endingLine =
    "If you enjoy this newsletter please share the HN Lessons&nbsp;website on any social platform to spread the word. Feedback is always appreciated, just reply to this e-mail.";
  const item = feed.items[0];
  const { contentSnippet: snippet, title, link, pubDate } = item;
  const $ = cheerio.load(item["content:encoded"]);
  const commentLink = $("td.mcnTextContent>h2")
    .next()
    .attr("href");
  const content = snippet.split("lessonsOfHN")[1];

  const strippedContent = content.split(endingLine)[0].split("-->")[0];
  const splitCommentBy = strippedContent.split("Comment, by");
  const startNote = `\n\n💻 *New Lesson* : `;

  const restOfTheContent = splitCommentBy[0].split(" ");

  const username = splitCommentBy[1].split("\n")[0].replace("&nbsp;", "");

  const usernameLink = `https://news.ycombinator.com/user?id=${username}`;
  const titleOfContent = `*${trimNewlines(
    convertToSpaces(splitCommentBy[0]).trim()
  )}* [Comment](${commentLink}), by [${username}](${usernameLink})\n\n\n`;
  const tempDesc = splitCommentBy[1].split("\n");
  tempDesc.shift();
  const desc = convertToSpaces(tempDesc.join("\n"))
    .trim()
    .replace(/&nbsp;/gm, " ");
  const endingNote = `\n\n\n📫 Email sent on ${pubDate} \n\n🔗 [View this in Browser](${link})\n\n🤔 Want to receive these via email❓\n\n📧 Subscribe to [Lessons Of HN](https://lessonsofhn.com)\n\n\n`;
  const finalNote = `${startNote} ${titleOfContent}${desc} ${endingNote}`;

  return finalNote;
};
