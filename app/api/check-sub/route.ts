import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "sub.txt");
    const content = fs.readFileSync(filePath, "utf-8").trim();
    const isActive = content === "Activated";
    return NextResponse.json({ active: isActive });
  } catch {
    // If file doesn't exist or can't be read, default to active
    return NextResponse.json({ active: true });
  }
}