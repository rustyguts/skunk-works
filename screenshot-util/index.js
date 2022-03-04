const fs = require('fs')
const path = require('path')
const puppeteer = require('puppeteer');
const chrome = require('chrome-cookies-secure');

async function scrape(url, outDir, config) {
  const cookies = await chrome.getCookiesPromised(url, 'puppeteer', config.chromeProfile || 'Default')

  let filename = url.split('://')[1]
  filename = filename.replaceAll('/', '-')

  const browser = await puppeteer.launch({
    headless: false,
    timeout: 100000,
    executablePath:  config.executablePath.replace(/\\/g, '')
  });
  
  const page = await browser.newPage();
  await page.setCookie(...cookies);
  await page.setViewport({width: 1920, height: 1080, deviceScaleFactor: 3 });
  await page.goto(url, {
      waitUntil: 'networkidle2'
  });
  await page.waitForTimeout(2000);

  await page.screenshot({ path: `${outDir}/${filename}.jpg`, fullPage: true });
  browser.close();
}

async function main() {
  const config = JSON.parse(fs.readFileSync(process.argv[2]))

  const OUT_DIR = config.outDir || './screenshots'
  try {
    fs.mkdirSync(OUT_DIR)
  } catch (error) { }

  for (const url of config.urls) {
    await scrape(url, OUT_DIR, config)
  }
}

main()