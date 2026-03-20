import prisma from "@/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../../auth/[...nextauth]/route";
import { ApiError } from "@/src/models";
import bcrypt from "bcryptjs";

export async function PATCH( req: NextRequest, context: RouteContext<'/api/admin/user/[id]'> ) {
  const session = await getServerSession(authOptions);
  const errors: ApiError[] = [];

  if (!session || session.user.role !== "ADMIN") {
    errors.push(
      { status: 401, message: "Unauthorized" }
    );
  }

  const { id } = await context.params;    
  
  if (!id) {
    errors.push({ status: 400, message: "Id is required." });
  }

  const body = await req.json();

  const { email, password } = body;

  if (!email && !password) {
    errors.push({ status: 400, message: "Email or password is required." });
  }

  if (email) {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser && existingUser.id !== id) {
      errors.push({ status: 400, message: "Email is already taken." });
    }
  }

  if (errors.length) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  const data: any = {};

  if (email) data.email = email;

  if (password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    data.password = hashedPassword;
  }

  const updatedUser = await prisma.user.update({
    where: { id },
    data,
  });

  return NextResponse.json(updatedUser);
};

export async function DELETE(req: NextRequest, context: RouteContext<'/api/admin/user/[id]'>) {
  const session = await getServerSession(authOptions);
  const errors: ApiError[] = [];

  if (!session || session.user.role !== "ADMIN") {
    errors.push(
      { status: 401, message: "Unauthorized" }
    );
  }

  const { id } = await context.params;    
  
  if (!id) {
    errors.push({ status: 400, message: "Id is required." });
  }
  
  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    errors.push({ status: 404, message: "User not found" });
  } else if (user.role === "ADMIN") {
    errors.push({ status: 403, message: "Cannot delete admin user" });
  }
  if (errors.length) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  await prisma.user.delete({
    where: { id },
  });

  return NextResponse.json({ success: true, id });
};
