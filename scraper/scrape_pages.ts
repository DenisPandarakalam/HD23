import puppeteer, { Browser } from "puppeteer";
import fs from "node:fs";

type data_type = {
  full_name: string;
  title: string;
  phone: string;
  address: {
    street?: string;
    street2?: string;
    city: string;
    state: string;
    zip: string;
  };
  long_description: string;
};

async function scrape_page(browser: Browser, url: string): Promise<Partial<data_type>> {
  const page = await browser.newPage();

  await page.setViewport({ width: 1080, height: 1024 });

  await page.goto(url);

  const main = await page.$(".details");
  if (!main) {
    throw new Error("No results found");
  }

  const desc = await main.$(".personal-statement-container");
  const all_span = await desc?.$$("span");
  if (!all_span) {
    throw new Error("No span found");
  }
  const all = await Promise.all(
    all_span.map(async (el) => {
      const text = await el.evaluate((el) => el.textContent);
      return text?.trim();
    })
  );

  const full_name = (await main.$(".profile-title").then((el) => el?.evaluate((el) => el.textContent)))?.trim() ?? "";

  const title =
    (await main.$(".profile-suffix-container").then((el) => el?.evaluate((el) => el.textContent)))?.trim() ?? "";

  const phone =
    (await main.$(".lets-connect-phone-number").then((el) => el?.evaluate((el) => el.getAttribute("href"))))
      ?.split(":")[1]
      .split("-")
      .join("") ?? "";

  await page.close();

  return {
    full_name,
    title,
    phone,
    long_description: all.join(" ") ?? "",
  };
}

const all_urls: string[] = [];

async function run() {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const urls = JSON.parse(fs.readFileSync("urls.json", "utf8"));
  const data = await scrape_page(browser, urls[0]);
  console.log(data);
  await browser.close();
}

run().then(() => {
  //   fs.writeFile("urls.json", JSON.stringify(all_urls), (err) => {
  //     if (err) {
  //       console.error(err);
  //       return;
  //     }
  //     console.log("File has been created");
  //   });
});
