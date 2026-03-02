import prisma from "@/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { ApiError } from "@/src/models";

// REMOVE from watchlist
export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  const errors: ApiError[] = [];

  if (!session?.user?.id) {
    errors.push({ status: 401, message: "Unauthorized" });
  }
  if (errors.length) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  const { tmdbId, type } = await req.json();

  await prisma.watchlist.delete({
    where: {
      userId_tmdbId_type: {
        userId: session.user.id,
        tmdbId,
        type,
      },
    },
  });

  return NextResponse.json({ success: true, tmdbId });
};
