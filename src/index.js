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

  // Extract jobs from job cards
  const jobs = await page.evaluate(() =>
    Array.from(document.querySelectorAll(".job-cards-council")).map((job) => [
      job.getElementsByTagName("h2")[0].innerHTML,
      job.getElementsByTagName("p")[0].innerHTML,
    ])
  );

  console.log(jobs);

  browser.close();
}
scrape();
