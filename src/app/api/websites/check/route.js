import { checkWebsites } from "@/utils/website-monitor/checkWebsites";
import { NextResponse } from "next/server";

export async function POST() {
  await checkWebsites();
  return NextResponse.json({ message: "Manual website check completed." });
}
