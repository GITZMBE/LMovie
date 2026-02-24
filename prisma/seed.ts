import { PrismaClient } from "@prisma/client/extension"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

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