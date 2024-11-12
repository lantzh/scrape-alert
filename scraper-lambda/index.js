import { fetchUserData } from "./services/dynamoService.js";
import { scrapeData } from "./services/scraperService.js";
import dotenv from "dotenv";
dotenv.config();

const username = process.env.USERNAME;

(async () => {
  try {
    const data = await fetchUserData(username);
    if (data) {
      const { url, keywords } = data;
      console.log("Starting scrape for URL:", url);
      console.log("Keywords: ", keywords);
      await scrapeData(url, keywords);
    } else {
      console.log("No data found for the user.");
    }
  } catch (error) {
    console.error("Error in scraper:", error);
  }
})();
