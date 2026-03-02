// app/api/continue-watching/route.ts
import { NextResponse } from "next/server";
import prisma from "@/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { ApiError, Genre } from "@/src/models";
import genresJSON from "@/public/api/genres.json";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json([], { status: 401 });

  const continueWatchingVideos = await prisma.continueWatching.findMany({
    where: { userId: session.user.id },
  });
  const genres = await JSON.parse(JSON.stringify(genresJSON)) as Genre[];

  const videosWithGenres = continueWatchingVideos.map(video => {
    const selectedGenres = genres.filter((genre) => video.genreIds?.includes(genre.id));
    return { ...video, genres: selectedGenres };
  });

  return NextResponse.json(videosWithGenres);
};

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const errors: ApiError[] = [];

  if (!session?.user?.id) {
    errors.push({ status: 401, message: "Unauthorized" });
  }
  if (errors.length) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  const {
    tmdbId,
    type,
    title,
    description,
    posterPath,
    backdropPath,
    releaseDate,
    rating,
    genreIds,
    season,
    episode
  } = await req.json();

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
      title,
      description,
      posterPath,
      backdropPath,
      releaseDate,
      rating,
      genreIds,
      season,
      episode,
    },
  });
  const genres = await JSON.parse(JSON.stringify(genresJSON)) as Genre[];
  
  const selectedGenres = genres.filter((genre) => updated.genreIds?.includes(genre.id));
  const videosWithGenres = { 
    ...updated, 
    genres: selectedGenres,
  };

  return NextResponse.json(videosWithGenres);
};
