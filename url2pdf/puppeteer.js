const puppeteer = require('puppeteer');

 
 
export async function go2url(url) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url, {waitUntil: 'networkidle0'});
  return {page, browser}
}
export async function page2PDF(url) {
  const {page, browser} = await go2url(url);
  const pdf = await page.pdf({ format: 'A4' });
  await browser.close();
  return pdf;
}

export async function savePage2PDF(url, path = './') {
  const {page, browser} = await go2url(url);
  const pdf = await page.pdf({ format: 'A4', path });
  await browser.close();
  return pdf;
}