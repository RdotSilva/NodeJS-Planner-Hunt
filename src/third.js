const dotenv = require("dotenv");
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const colors = require("colors");
const jobOutputPath = path.join(__dirname, "../output/third.txt");
dotenv.config();
const { THIRD_JOB_URL: jobUrl, THIRD_BASE_URL: baseUrl } = process.env;

/**
 * Main function to fetch third type of jobs
 */
async function scrape() {
  const browser = await puppeteer.launch({});
  const page = await browser.newPage();

  await page.goto(jobUrl);

  // Total search results are kept in a span
  const totalSearchResults = await page.$$eval("span", (elements) =>
    elements.map((el) => el.innerText)
  );

  if (totalSearchResults[0] > 0) {
    console.log("Jobs Found".green);
  }
  browser.close();
}
scrape();
