import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/models/prisma/client";
import bcrypt from "bcryptjs";

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const adminEmail = "admin@admin.com"

  const existing = await prisma.user.findUnique({
    where: { email: adminEmail },
  })

  if (existing) {
    console.log("Admin already exists")
    return
  }

  const hashedPassword = await bcrypt.hash("admin123", 10)

  await prisma.user.create({
    data: {
      email: adminEmail,
      password: hashedPassword,
      role: "ADMIN",
    },
  })

  console.log("Admin created")
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())