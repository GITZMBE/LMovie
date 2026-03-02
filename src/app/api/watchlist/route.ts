import prisma from "@/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { ApiError, Genre } from "@/src/models";
import genresJSON from "@/public/api/genres.json";

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
  const genres = await JSON.parse(JSON.stringify(genresJSON)) as Genre[];
  
  const videosWithGenres = watchlist.map(video => {
    const selectedGenres = genres.filter((genre) => video.genreIds?.includes(genre.id));
    return { ...video, genres: selectedGenres };
  });

  return NextResponse.json(videosWithGenres);
};

// ADD to watchlist
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
  } = await req.json();

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
      title,
      description,
      posterPath,
      backdropPath,
      releaseDate,
      rating,
      genreIds,
    },
  });
  const genres = await JSON.parse(JSON.stringify(genresJSON)) as Genre[];
  
  const selectedGenres = genres.filter((genre) => item.genreIds?.includes(genre.id));
  const videosWithGenres = { 
    ...item, 
    genres: selectedGenres 
  };
  
  return NextResponse.json(videosWithGenres);
};
