import prisma from "@/prisma";
import { ApiError } from "@/src/models";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function DELETE(req: Request, context: RouteContext<'/api/continue-watching/[tmdbId]'>) {
  const session = await getServerSession(authOptions);
  const errors: ApiError[] = [];

  if (!session?.user?.id) {
    errors.push({ status: 401, message: "Unauthorized" });
  }

  const { tmdbId } = await context.params;

  if (!tmdbId) {
    errors.push({ status: 400, message: "TmdbId is required." });
  }
  if (errors.length) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  await prisma.continueWatching.deleteMany({
    where: {
      userId: session.user.id,
      tmdbId,
    },
  });

  return NextResponse.json({ success: true });
};