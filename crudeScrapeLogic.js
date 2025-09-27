const puppeteer = require("puppeteer-core");
const chromium = require("chrome-aws-lambda");
require("dotenv").config();

const crudeScrapeLogic = async (res) => {
  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: chromium.headless,
    ignoreHTTPSErrors: true,
  });
  try {
    const now = new Date();
    const param1 = Math.floor(now.getTime());
    const param2 = param1 - 28020600;
    
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/110.0');
    
    const url = `https://priceapi.moneycontrol.com/globaltechCharts/usMarket/index/history?symbol=CL1%3ACOM&resolution=15&from=${param1}&to=${param1}&countback=1050&currencyCode=USD`;
    
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

module.exports = { crudeScrapeLogic };
