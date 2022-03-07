const dotenv = require("dotenv");
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const twilio = require("twilio");
const jobOutputPath = path.join(__dirname, "../output/jobs.txt");

dotenv.config();

const {
  JOB_URL: jobUrl,
  TWILIO_SID: twilioSid,
  TWILIO_TOKEN: twilioToken,
  TO_NUMBER: toNumber,
  FROM_NUMBER: fromNumber,
} = process.env;

const twilioClient = new twilio(twilioSid, twilioToken);

const sendSms = (results) => {
  twilioClient.messages.create({
    body: formatResults(results),
    to: toNumber,
    from: fromNumber,
  });
};

const formatResults = (totalResults) => {
  let newDate = new Date(Date.now());
  const totalResultDataToWrite = `
    ${newDate.toDateString()} - ${newDate.toLocaleTimeString()}: ${totalResults}
    `;

  return totalResultDataToWrite;
};

async function scrape() {
  const browser = await puppeteer.launch({});
  const page = await browser.newPage();

  await page.goto(jobUrl);

  // Total search results are kept in a span
  const spanTexts = await page.$$eval("span", (elements) =>
    elements.map((el) => el.innerText)
  );

  const totalResults = spanTexts[1];
  sendSms(totalResults);
  console.log(totalResults);

  // Extract jobs from job cards
  const jobs = await page.evaluate(() =>
    Array.from(document.querySelectorAll(".job-cards-council")).map((job) => [
      job.getElementsByTagName("h2")[0].innerHTML,
      job.getElementsByTagName("p")[0].innerHTML,
    ])
  );

  console.log(jobs);

  fs.appendFileSync(jobOutputPath, formatResults(totalResults));

  browser.close();
}
scrape();
