const puppeteer = require("puppeteer-core");
const chromium = require("@sparticuz/chromium");
require("dotenv").config();

const scrapeLogic = async (res) => {
  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(),
    headless: chromium.headless,
    ignoreHTTPSErrors: true,
  });
  try {
    const now = new Date();
    const param1 = Math.floor(now.getTime());
    const param2 = param1 - 1727980000;
    
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/110.0');
    
    const url = `https://groww.in/v1/api/charting_service/v2/chart/delayed/exchange/NSE/segment/CASH/BANKNIFTY?endTimeInMillis=${param1}&intervalInMinutes=5&startTimeInMillis=${param2}`;
    
    await page.goto(url, {
      waitUntil: "domcontentloaded",
    });
    
    await page.setViewport({ width: 1080, height: 1024 });
    
    const fullTitle = await page.evaluate(() => {
      return document.body.textContent;
    });

    const logStatement = `${fullTitle}`;
    console.log(logStatement);
    res.send(logStatement);
  } catch (e) {
    console.error(e);
    res.send(`Something went wrong while running Puppeteer: ${e}`);
  } finally {
    await browser.close();
  }
};

module.exports = { scrapeLogic };
