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

  // Get individual job cards, should match the total search results above in length
  let jobs = await page.evaluate(() => {
    let data = [];
    let elements = document.getElementsByClassName("job-cards-council");

    console.log(`elements: ${elements}`);

    for (var element of elements) {
      data.push(element.getElementsByTagName("p"));
    }
    return data;
  });

  console.log(jobs);

  browser.close();
}
scrape();
