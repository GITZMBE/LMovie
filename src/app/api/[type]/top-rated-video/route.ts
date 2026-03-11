import { NextResponse } from "next/server";
import { fetchLogo, fetchTopVideo } from "@/src/api";
import { ApiError, Genre, VideoType } from "@/src/models";
import genresJSON from "@/public/api/genres.json";

export const GET = async (req: Request, context: RouteContext<'/api/[type]/top-rated-video'>) => {
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

  const video = await fetchTopVideo(type as VideoType);
  
  if (video.genres && video.genres.length) {
    const videoWithLogo = { ...video, logo: await fetchLogo(video.id, type as VideoType) };

    return NextResponse.json(videoWithLogo);
  } else {
    const genres = await JSON.parse(JSON.stringify(genresJSON)) as Genre[];

    const videoWithGenres = {
      ...video,
      genres: genres.filter((genre) => video.genreIds?.includes(genre.id)),
    };

    const videoWithLogo = { ...videoWithGenres, logo: await fetchLogo(video.id, type as VideoType) };

    return NextResponse.json(videoWithLogo);    
  }
};