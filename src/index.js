const dotenv = require("dotenv");
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const twilio = require("twilio");
const Datastore = require("nedb");
const jobOutputPath = path.join(__dirname, "../output/jobs.txt");
const databasePath = path.join(__dirname, "../input/jobs.json");
dotenv.config();
const {
  JOB_URL: jobUrl,
  TWILIO_SID: twilioSid,
  TWILIO_TOKEN: twilioToken,
  TO_NUMBER: toNumber,
  FROM_NUMBER: fromNumber,
} = process.env;
const dbConnection = new Datastore({ filename: databasePath, autoload: true });
const twilioClient = new twilio(twilioSid, twilioToken);
const dbReferenceId = "fJ0p8GfKYkEwgbSm";

const formatResults = (totalResults) => {
  let newDate = new Date(Date.now());
  const totalResultDataToWrite = `
    ${newDate.toDateString()} - ${newDate.toLocaleTimeString()}: ${totalResults}
    `;

  return totalResultDataToWrite;
};

const sendSms = (results) => {
  twilioClient.messages.create({
    body: formatResults(results),
    to: toNumber,
    from: fromNumber,
  });
};

/**
 * Check the new results against the old results in database
 * @param {Object} newResults Results from latest job fetch
 */
const checkDbResults = (newResults) => {
  dbConnection.findOne({ _id: dbReferenceId }, function (err, doc) {
    const { results, links } = doc;
    if (results !== newResults.results) {
      let newJobLinks = newResults.links.filter((x) => !links.includes(x));
      console.log(newJobLinks);
    } else {
      console.log("No new jobs found");
    }
  });
};

/**
 * Main function to fetch jobs
 */
async function scrape() {
  const browser = await puppeteer.launch({});
  const page = await browser.newPage();

  await page.goto(jobUrl);

  // Total search results are kept in a span
  const spanTexts = await page.$$eval("span", (elements) =>
    elements.map((el) => el.innerText)
  );
  const totalResults = spanTexts[1];

  // Extract jobs from job cards
  const jobs = await page.evaluate(() =>
    Array.from(document.querySelectorAll(".job-cards-council")).map((job) => ({
      title: job.getElementsByTagName("h2")[0].innerHTML,
      area: job.getElementsByTagName("p")[0].innerHTML,
    }))
  );

  // Extract jobs links
  const jobLinks = await page.evaluate(() =>
    Array.from(document.querySelectorAll(".job-cards-item")).map((job) =>
      job.getElementsByTagName("a")[0].getAttribute("href")
    )
  );

  const freshJobResults = {
    results: totalResults,
    links: jobLinks,
  };

  checkDbResults(freshJobResults);

  fs.appendFileSync(jobOutputPath, formatResults(totalResults));

  browser.close();
}
scrape();
