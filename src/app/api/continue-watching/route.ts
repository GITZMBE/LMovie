// app/api/continue-watching/route.ts
import { NextResponse } from "next/server";
import prisma from "@/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { tmdbId, type, season, episode } = await req.json();

  const updated = await prisma.continueWatching.upsert({
    where: {
      userId_tmdbId_type: {
        userId: session.user.id,
        tmdbId,
        type,
      },
    },
    update: {
      season,
      episode,
    },
    create: {
      userId: session.user.id,
      tmdbId,
      type,
      season,
      episode,
    },
  });

  return NextResponse.json(updated);
};
