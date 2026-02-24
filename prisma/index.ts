import { PrismaClient } from "@prisma/client/extension";

interface GlobalWithPrisma {
  prisma?: PrismaClient;
}

const globalWithPrisma = globalThis as GlobalWithPrisma;
const prisma = globalWithPrisma.prisma || new PrismaClient();

export default prisma;