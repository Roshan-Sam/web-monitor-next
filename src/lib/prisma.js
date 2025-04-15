// import { PrismaClient } from "@prisma/client";
import { PrismaClient } from "@prisma/client/edge";

const globalForPrisma = globalThis;

const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
