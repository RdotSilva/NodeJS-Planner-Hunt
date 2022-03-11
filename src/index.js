const dotenv = require("dotenv");
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const jobOutputPath = path.join(__dirname, "../output/jobs.txt");
const { sendSms } = require("../utils/sendSms");
dotenv.config();
const { JOB_URL: jobUrl, BASE_URL: baseUrl } = process.env;
const { updateJobRecord, findJobRecord } = require("../utils/database");

const formatResults = (totalResults) => {
  let newDate = new Date(Date.now());
  const totalResultDataToWrite = `
    ${newDate.toDateString()} - ${newDate.toLocaleTimeString()}: ${totalResults}
    `;

  return totalResultDataToWrite;
};

/**
 * Check the new results against the old results in database
 * @param {Object} newResults Results from latest job fetch
 */
const checkDbResults = async (newResults) => {
  const foundJobRecord = await findJobRecord;

  const { results, links } = foundJobRecord;
  if (results !== newResults.results) {
    let newJobLinks = newResults.links
      .filter((x) => !links.includes(x))
      .map((result) => `${baseUrl}${result}`);
    console.log(newJobLinks);
    updateJobRecord(newResults);
    // sendSms(newJobLinks);
  } else {
    console.log("No new jobs");
  }
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
