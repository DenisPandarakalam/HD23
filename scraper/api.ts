import * as dotenv from "dotenv";
dotenv.config();
import fs from "node:fs";
// import file from "./uuids.json";
import type { TherapyFull } from "./types_full";
import { CategoryName } from "./types_full";
import { CustomType } from "./struct";
import Bottleneck from "bottleneck";
import { HttpsProxyAgent } from "https-proxy-agent";
import fetch from "node-fetch";

const limiter = new Bottleneck({
  maxConcurrent: 30,
  minTime: 250,
});

const file = fs.readFileSync("./uuids.json", "utf8");
const uuids_raw: string[] = JSON.parse(file);

const uuids = uuids_raw;

const proxy = new HttpsProxyAgent(process.env.PROXY_URL ?? "http://test.invalid");
async function scrape_uuid(uuid: string): Promise<CustomType | null> {
  try {
    const url = `https://www.psychologytoday.com/directory-listing/listing/profile/${uuid}?lang=en`;
    const req = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36",
        Accept: "application/json, text/plain, */*",
        "Accept-Language": "en-US,en;q=0.5",
        Referer: "https://www.psychologytoday.com/us/therapists/ca/davis",
        Origin: "https://www.psychologytoday.com",
        Connection: "keep-alive",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-site",
      },
      agent: proxy,
    });
    const json = (await req.json()) as any satisfies TherapyFull as TherapyFull | null;
    if (!json) {
      return null;
    }

    const c_type: CustomType = {
      full_name: json.listingName,
      name: {
        title: json.title,
        first: json.firstName,
        last: json.lastName,
      },
      accepting_new_patients: json.accepting_appointments === "NO" ? false : true,
      appointments: {
        online: json.appointments?.online === "NO" ? false : true,
        in_person: json.appointments?.inPerson === "NO" ? false : true,
      },
      phone: json.phoneNumber,
      pronouns: json.pronouns,
      location: {
        line1: json.primaryLocation?.addressLine1,
        line2: json.primaryLocation?.addressLine2,
        city: json.primaryLocation?.cityName,
        region: json.primaryLocation?.regionName,
        region_code: json.primaryLocation?.regionCode,
        postal_code: json.primaryLocation?.postalCode,
        country_code: json.primaryLocation?.countryCode,
        lat: json.primaryLocation?.lat,
        lng: json.primaryLocation?.lon,
      },
      education: {
        school: json.education?.institution,
        graduation_year: json.education?.yearEducationCompleted,
        years_in_practice: json.education?.yearsInPractice,
      },
      fees: {
        individual: json.fees?.individual_session_cost,
        couple: json.fees?.couples_session_cost,
      },
      paragraph_descriptions: json.personalStatements?.map((el) => el.paragraph1 + el.paragraph2 + el.paragraph3),
      age_focus: json.attributes?.filter((el) => el.category_name == CategoryName.AgeFocus).map((el) => el.title),
      issues: json.attributes?.filter((el) => el.category_name == CategoryName.Issues).map((el) => el.title),
      modailities: json.attributes?.filter((el) => el.category_name == CategoryName.Modality).map((el) => el.title),
      payment_methods: json.attributes
        ?.filter((el) => el.category_name == CategoryName.PaymentMethod)
        .map((el) => el.title),
      treatment_orientation: json.attributes
        ?.filter((el) => el.category_name == CategoryName.TreatmentOrientation)
        .map((el) => el.title),
    };

    return c_type;
  } catch (e) {
    console.log(e);
    console.log(`Retrying ${uuid}`);
    return await limiter.schedule(() => scrape_uuid(uuid));
  }
}

const total = uuids.length;

async function run() {
  const all_data = await Promise.all(
    uuids.map(async (uuid, i) => {
      const data = await limiter.schedule(() => scrape_uuid(uuid));
      console.log(`Finished ${uuid} (${i + 1}/${total}})`);
      return data;
    })
  );

  fs.writeFileSync("./data.json", JSON.stringify(all_data, null, 2));
}

run();
