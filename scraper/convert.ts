import * as dotenv from "dotenv";
dotenv.config();
import fs from "node:fs";
import { nanoid } from "nanoid";
import { TherapyFull } from "./types_full";

const data: TherapyFull[] = JSON.parse(fs.readFileSync("./data.json", "utf8"));

let m: any = {};

for (const therapy of data) {
  const id = nanoid();
  if (m[id]) {
    throw new Error("collision");
  }
  m[id] = therapy;
}

fs.writeFileSync("./data_map.json", JSON.stringify(m, null, 2));
