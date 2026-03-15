import { fetchInfo, fetchSeriesSeasonInfo } from "@/src/api";
import { ApiError, Genre, VideoType } from "@/src/models";
import { NextRequest, NextResponse } from "next/server";
import genresJSON from "@/public/api/genres.json";

export const GET = async (req: NextRequest, context: RouteContext<'/api/[type]/[id]'>) => {
  const { type, id } = await context.params;
  
  const errors: ApiError[] = [];
  
  if (!type) {
    errors.push({ status: 400, message: "Type is required." });
  } 
  if (!["movie", "series"].includes(type)) {
    errors.push({ status: 400, message: "Invalid video type." });
  } 
  if (!id) {
    errors.push({ status: 400, message: "Id is required." });
  };
  if (isNaN(parseInt(id))) {
    errors.push({ status: 400, message: "Id must be a number." });
  }
  if (errors.length) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  const video = await fetchInfo(parseInt(id), type as VideoType);

  const genres = await JSON.parse(JSON.stringify(genresJSON)) as Genre[];

  const videoWithGenres = {
    ...video,
    genres: video.genres || genres.filter((genre) => video.genreIds?.includes(genre.id)),
  };

  const seasonsWithoutSpecials = videoWithGenres?.seasons?.filter((season) => season.seasonNumber !== 0);
  const seasonPromise = seasonsWithoutSpecials?.map((season) => fetchSeriesSeasonInfo(+id, season.seasonNumber));
  if (seasonPromise) {
    const seasons = await Promise.all(seasonPromise);
    videoWithGenres.seasons = seasons;
  }

  return NextResponse.json(videoWithGenres);
};