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

  browser.close();
}
scrape();
