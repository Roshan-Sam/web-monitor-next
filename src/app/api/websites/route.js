import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name");
  const date = searchParams.get("date");

  let where = {};

  if (name) {
    where.site_name = { contains: name, mode: "insensitive" };
  }

  if (date) {
    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);

    where.statusHistory = {
      some: {
        check_time: {
          gte: startDate,
          lte: endDate,
        },
      },
    };
  }

  const websites = await prisma.website.findMany({
    where,
    include: {
      statusHistory: { orderBy: { check_time: "desc" } },
    },
  });

  return NextResponse.json(websites);
}

export async function POST(req) {
  const body = await req.json();
  const website = await prisma.website.create({
    data: { site_name: body.site_name, url: body.url },
  });
  return NextResponse.json(website);
}
