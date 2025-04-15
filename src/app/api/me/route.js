import { verifyToken } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) return NextResponse.json({ user: null }, { status: 401 });

    const decoded = verifyToken(token);

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return NextResponse.json({ user: null }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ user: null }, { status: 401 });
  }
}
