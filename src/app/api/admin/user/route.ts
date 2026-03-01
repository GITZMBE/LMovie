
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";
import bcrypt from "bcryptjs";
import prisma from "@/prisma";
import { Role } from "@/src/models/prisma/enums";
import { NextRequest, NextResponse } from "next/server";
import { ApiError } from "@/src/models";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (session?.user.role !== "ADMIN") {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  const users = await prisma.user.findMany();

  return NextResponse.json(users);
};

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const errors: ApiError[] = [];

  if (session?.user.role !== "ADMIN") {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  const { email, password } = await req.json();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email) {
    errors.push({ status: 400, message: "Email is required." });
  } else if (!emailRegex.test(email)) {
    errors.push({
      status: 400,
      message:
        "Invalid email format. Please use format: example@domain.com",
    });
  }
  if (!password) {
    errors.push({ status: 400, message: "Password is required." });
  }
  if (errors.length) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  const hashed = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashed,
      role: Role.USER, // default role
    },
  });

  return NextResponse.json(user);
};
