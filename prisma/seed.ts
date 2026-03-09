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
  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL as string;

  if (!adminEmail) {
    console.log("Admin email is not set")
    return;
  }

  const existing = await prisma.user.findUnique({
    where: { email: adminEmail },
  })

  if (existing) {
    console.log("Admin already exists")
    return;
  }

  const password = process.env.NEXT_PUBLIC_ADMIN_PASSWORD as string;

  if (!password) {
    console.log("Admin password is not set")
    return;
  }
  
  const hashedPassword = await bcrypt.hash(password, 10)

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