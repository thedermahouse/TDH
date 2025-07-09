import { PrismaClient } from "@prisma/client";

const db =
  globalThis.prisma ||
  new PrismaClient({
    log: ["error"],
  });

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;

export default db;
