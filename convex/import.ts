import fs from "fs";
import csv from "csv-parser";
import { ConvexHttpClient } from "convex/browser";
import { api } from "./_generated/api.js";
const client = new ConvexHttpClient(process.env.CONVEX_URL!);

const alumni: any[] = [];

fs.createReadStream("public/alumni-data/2024-2025.csv")
  .pipe(csv())
  .on("data", async (row) => {
  if (!row.fullName || !row.dob) {
    return;
  }

  const cleanedDob = row.dob.replace(/\s+/g, "");
  const [day, month, year] = cleanedDob.split("-");

  const formattedDob = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;

  await client.mutation(api.alumni.addAlumni, {
    fullName: row.fullName.trim(),
    dob: formattedDob,
    batchYear: row.batchYear,
    whatsappLink: row.whatsappLink,
  });

  console.log("Inserted:", row.fullName);
})