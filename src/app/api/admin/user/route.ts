
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";
import bcrypt from "bcryptjs";
import prisma from "@/prisma";
import { Role } from "@/src/models/prisma/enums";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (session?.user.role !== "ADMIN") {
    return new Response("Unauthorized", { status: 403 });
  }

  const { email, password } = await req.json();

  const hashed = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashed,
      role: Role.USER, // default role
    },
  });

  return Response.json(user);
};
