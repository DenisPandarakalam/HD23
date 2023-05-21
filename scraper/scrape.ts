import puppeteer, { Browser } from "puppeteer";
import fs from "fs";

async function scrape_page_urls(browser: Browser, page_number: number): Promise<string[]> {
  const page = await browser.newPage();

  await page.setViewport({ width: 1080, height: 1024 });

  const url = new URL("https://www.psychologytoday.com/us/therapists/ca/davis");
  if (page_number > 1) {
    url.searchParams.append("page", page_number.toString());
  }

  await page.goto(url.toString());

  // Type into search box
  const results = await page.$(".results");
  if (!results) {
    throw new Error("No results found");
  }
  // console log the html of the results var above
  //   console.log(await results.evaluate((el) => el.innerHTML));
  const divs = await results.$$("div.results-row");
  console.log(divs.length);
  //   console.log(await divs[0].evaluate((el) => el.getAttribute("data-x")));
  const urls = await Promise.all(
    divs.map(async (result): Promise<string> => {
      // console.log x-data
      //   const x_data = await result.evaluate((el) => el.getAttribute("data-x"));
      //   console.log(x_data);
      //   return x_data ?? "";
      const a_link = await result.$("a");
      // console.log(a_link);
      const href = await a_link?.evaluate((el) => el.getAttribute("href"));
      return href ?? "";
    })
  );

  await page.close();

  return urls;
}

const all_urls: string[] = [];

async function run_all() {
  const browser = await puppeteer.launch({
    headless: false,
  });
  for (let i = 1; i <= 14; i++) {
    const urls = await scrape_page_urls(browser, i);
    all_urls.push(...urls);
    // sleep for 1 second
    await new Promise((resolve) => setTimeout(resolve, 150));
  }
  await browser.close();
}

run_all().then(() => {
  fs.writeFile("urls.json", JSON.stringify(all_urls), (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("File has been created");
  });
});
