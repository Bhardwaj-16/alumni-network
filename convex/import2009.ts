import fs from "fs";
import csv from "csv-parser";
import { ConvexHttpClient } from "convex/browser";
import { api } from "./_generated/api.js";
const client = new ConvexHttpClient(process.env.CONVEX_URL!);

const alumni: any[] = [];

fs.createReadStream("2009.csv")
  .pipe(csv())
  .on("data", async (row) => {
  if (!row.fullName || !row.dob) {
    return;
  }

  const [day, month, year] = row.dob.split(".");

  const formattedDob = `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year}`;

  await client.mutation(api.alumni.addAlumni, {
    fullName: row.fullName.trim(),
    dob: formattedDob,
    batchYear: row.batchYear,
    whatsappLink: row.whatsappLink,
  });

  console.log("Inserted:", row.fullName);
})