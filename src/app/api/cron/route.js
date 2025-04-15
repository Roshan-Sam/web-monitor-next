import { cronManager } from "@/lib/cron/manager";
import { NextResponse } from "next/server";

export async function POST(request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    cronManager.initialize();
    return NextResponse.json({
      success: true,
      message: "Cron jobs initialized",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Initialization failed" },
      { status: 500 }
    );
  }
}
