import prisma from "@/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

// GET all watchlist items
export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json([], { status: 401 });
  }

  const watchlist = await prisma.watchlist.findMany({
    where: { userId: session.user.id },
    orderBy: { id: "desc" },
  });

  return NextResponse.json(watchlist);
}

// ADD to watchlist
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { tmdbId, type } = await req.json();

  if (!tmdbId || !type) {
    return NextResponse.json(
      { error: "Missing tmdbId or type" },
      { status: 400 }
    );
  }

  const item = await prisma.watchlist.upsert({
    where: {
      userId_tmdbId_type: {
        userId: session.user.id,
        tmdbId,
        type,
      },
    },
    update: {},
    create: {
      userId: session.user.id,
      tmdbId,
      type,
    },
  });

  return NextResponse.json(item);
}

// REMOVE from watchlist
export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
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

  return NextResponse.json({ success: true });
}