import { convertToPDF } from "./puppeteer.js";

const url = process.argv[2];
if (!url) {
  console.error("Usage: node convert.js <url>");
  process.exit(1);
}
await convertToPDF(url);
