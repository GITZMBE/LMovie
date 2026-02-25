// app/api/favorites/route.ts
import { NextResponse } from "next/server";
import prisma from "@/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json([], { status: 401 });

  const favorites = await prisma.favorite.findMany({
    where: { userId: session.user.id },
  });

  return NextResponse.json(favorites);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { tmdbId, type } = await req.json();

  const favorite = await prisma.favorite.upsert({
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

  return NextResponse.json(favorite);
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { tmdbId, type } = await req.json();

  await prisma.favorite.delete({
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