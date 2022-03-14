const dotenv = require("dotenv");
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const colors = require("colors");
const jobOutputPath = path.join(__dirname, "../output/secondary.txt");
dotenv.config();
const { SECONDARY_JOB_URL: jobUrl, SECONDARY_BASE_URL: baseUrl } = process.env;

/**
 * Main function to fetch secondary jobs
 */
async function scrape() {
  const browser = await puppeteer.launch({});
  const page = await browser.newPage();

  await page.goto(jobUrl);

  // Total search results are kept in a span
  const spanTexts = await page.$$eval("span", (elements) =>
    elements.map((el) => el.innerText)
  );
  const resultsRange = spanTexts[0];

  // Extract the number of jobs per county
  const counties = await page.evaluate(() =>
    Array.from(document.querySelectorAll(".job-cards")).map((job) => ({
      county: job.getElementsByTagName("h2")[0].innerHTML,
      jobs: job.getElementsByTagName("p").length, // Find the total number of
    }))
  );

  browser.close();
}
scrape();
