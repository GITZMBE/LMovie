import prisma from "@/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { ApiError } from "@/src/models";

// REMOVE from watchlist
export async function DELETE(req: Request, context: RouteContext<'/api/watchlist/[tmdbId]'>) {
  const session = await getServerSession(authOptions);
  const { tmdbId } = await context.params;
  const errors: ApiError[] = [];

  if (!session?.user?.id) {
    errors.push({ status: 401, message: "Unauthorized" });
  }
  if (!tmdbId) {
    errors.push({ status: 400, message: "TmdbId is required." });
  }
  if (isNaN(parseInt(tmdbId))) {
    errors.push({ status: 400, message: "TmdbId must be a number." });
  }
  
  const { type } = await req.json();

  if (!type) {
    errors.push({ status: 400, message: "Type is required." });
  }
  if (!["movie", "series"].includes(type)) {
    errors.push({ status: 400, message: "Invalid video type." });
  }
  if (errors.length) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  await prisma.watchlist.delete({
    where: {
      userId_tmdbId_type: {
        userId: session.user.id,
        tmdbId: +tmdbId,
        type,
      },
    },
  });

  return NextResponse.json({ success: true, tmdbId });
};
