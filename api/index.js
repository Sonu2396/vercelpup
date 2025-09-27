const express = require("express");

const { scrapeLogic } = require("../scrapeLogic");
const { niftyScrapeLogic } = require("../niftyScrapeLogic");
const { crudeScrapeLogic } = require("../crudeScrapeLogic");
const app = express();

// Enable CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});


const PORT = process.env.PORT || 4000;

app.get("/scrape", (req, res) => {
  scrapeLogic(res);
});


app.get("/nscrape", (req, res) => {
  niftyScrapeLogic(res);
});

app.get("/cscrape", (req, res) => {
  crudeScrapeLogic(res);
});

app.get("/", (req, res) => {
  res.send("Vercel Puppeteer server is up and running!");
});

// For Vercel serverless, export the app instead of listening
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
}


module.exports = app;
