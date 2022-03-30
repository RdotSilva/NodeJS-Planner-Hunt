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

  // Extract the phone numbers for each position
  const phoneNumbers = await page.evaluate(() =>
    Array.from(document.querySelectorAll(".call-now")).map((number) => ({
      numbers: number.getElementsByTagName("p"),
    }))
  );
  // Extract the phone numbers for each position
  const emailAddresses = await page.evaluate(() =>
    Array.from(document.querySelectorAll(".call-now")).map((block) => ({
      emails: block.getElementsByTagName("footer"),
    }))
  );

  if (totalSearchResults[0] > 0) {
    console.log("Jobs Found".green);
  }

  if (phoneNumbers) {
    console.log("Phone numbers have been found".green);
  }

  if (emailAddresses) {
    console.log("Email addresses have been found".green);
  }
  browser.close();
}
scrape();
