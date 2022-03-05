const dotenv = require("dotenv");
const puppeteer = require("puppeteer");

dotenv.config();

const { JOB_URL: jobUrl } = process.env;

async function scrape() {
  const browser = await puppeteer.launch({});
  const page = await browser.newPage();

  await page.goto(jobUrl);

  // Total search results are kept in a span
  const spanTexts = await page.$$eval("span", (elements) =>
    elements.map((el) => el.innerText)
  );

  const totalResults = spanTexts[1];
  console.log(totalResults);
}
scrape();
