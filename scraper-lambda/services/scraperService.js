import puppeteer from "puppeteer";

export const scrapeData = async (url, keywords) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    await page.goto(url, { waitUntil: "domcontentloaded" });

    const pageContent = await page.content();
    const foundKeywords = keywords.filter((keyword) =>
      pageContent.includes(keyword)
    );

    console.log("Keywords found:", foundKeywords);

    const title = await page.title();
    console.log("Page Title:", title);

    await browser.close();
  } catch (error) {
    console.error("Error scraping data:", error);
    await browser.close();
  }
};
