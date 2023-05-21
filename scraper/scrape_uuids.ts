import puppeteer, { Browser } from "puppeteer";
import fs from "node:fs";
import type { Therapytypes } from "./types";

async function scrape_page_urls(browser: Browser, page_number: number): Promise<string[]> {
  const page = await browser.newPage();

  await page.setViewport({ width: 1080, height: 1024 });

  const url = new URL("https://www.psychologytoday.com/us/therapists/ca/davis");
  if (page_number > 1) {
    url.searchParams.append("page", page_number.toString());
  }

  await page.goto(url.toString());

  // evaluate js window.__NUXT__
  const nuxt_data = await page.evaluate(() => {
    // @ts-ignore
    return window.__NUXT__.data.map((e: any) => e.resultsItems);
  });
  await page.close();

  return nuxt_data[0].map((e: Therapytypes) => e.profileUuid);
}

const all_uuids: string[] = [];

async function run_all() {
  const browser = await puppeteer.launch({
    headless: false,
  });
  for (let i = 1; i <= 14; i++) {
    const urls = await scrape_page_urls(browser, i);
    all_uuids.push(...urls);
    // sleep for 1 second
    await new Promise((resolve) => setTimeout(resolve, 150));
  }
  await browser.close();
}

run_all().then(() => {
  fs.writeFile("uuids.json", JSON.stringify(all_uuids), (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("File has been created");
  });
});
