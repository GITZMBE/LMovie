import { NextResponse } from "next/server";
import { fetchPopular } from "@/src/api";
import { ApiError, Genre, VideoType } from "@/src/models";
import genresJSON from "@/public/api/genres.json";

export const GET = async (req: Request, context: RouteContext<'/api/[type]/popular'>) => {
  const { type } = await context.params;

  const errors: ApiError[] = [];
    
  if (!type) {
    errors.push({ status: 400, message: "Type is required." });
  } 
  if (!["movie", "series"].includes(type)) {
    errors.push({ status: 400, message: "Invalid video type." });
  } 
  if (errors.length) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  const videos = await fetchPopular(type as VideoType);
  const genres = await JSON.parse(JSON.stringify(genresJSON)) as Genre[];

  const videosWithGenres = videos.map(video => {
    const selectedGenres = genres.filter((genre) => video.genreIds?.includes(genre.id));
    return { ...video, genres: selectedGenres };
  });

  return NextResponse.json(videosWithGenres);
};