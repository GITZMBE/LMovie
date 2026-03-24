
import { fetchQuery } from "@/src/api";
import { ApiError, Genre, VideoType } from "@/src/models";
import { NextRequest, NextResponse } from "next/server";
import genresJSON from "@/public/api/genres.json";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");
  const type = searchParams.get("type");
  const page = searchParams.get("page");
  const errors: ApiError[] = [];

  if (!query) {
    errors.push({ status: 400, message: "Query is required." });
  }
  if (errors.length) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  const paginatedVideos = await fetchQuery(query as string, type as VideoType, page ? parseInt(page) : 1);
  const genres = await JSON.parse(JSON.stringify(genresJSON)) as Genre[];

  const paginatedVideosWithGenres = {
    ...paginatedVideos, 
    results: paginatedVideos.results.map(video => {
      const selectedGenres = genres.filter((genre) => video.genreIds?.includes(genre.id));
      return { ...video, genres: selectedGenres };
    })
  };

  return NextResponse.json(paginatedVideosWithGenres);
}