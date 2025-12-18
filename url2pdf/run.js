import { page2PDF, savePage2PDF, convertToPDF } from "./puppeteer.js";

//savePage2PDF("http://localhost:8080/");
await convertToPDF("http://localhost:8080/");
