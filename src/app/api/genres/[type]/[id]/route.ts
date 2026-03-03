import { NextResponse } from "next/server";
import genresJSON from "@/public/api/genres.json";
import { ApiError, Genre, VideoType } from "@/src/models";
import { fetchVideosByGenre } from "@/src/api";

export const GET = async (req: Request, context: RouteContext<'/api/genres/[type]/[id]'>) => {
  const { id, type } = await context.params;
  const genres = await JSON.parse(JSON.stringify(genresJSON)) as Genre[];
  const errors: ApiError[] = [];

  if (!id) {
    errors.push({ status: 400, message: "Id is required." });
  }
  if (isNaN(parseInt(id))) {
    errors.push({ status: 400, message: "Id must be a number." });
  }
  if (!type) {
    errors.push({ status: 400, message: "Type is required." });
  }
  if (!["movie", "series"].includes(type)) {
    errors.push({ status: 400, message: "Invalid video type." });
  }
  const genre = genres.find((g) => g.id === parseInt(id));
  if (!genre) {
    errors.push({ status: 404, message: "Genre not found." });
  }
  if (errors.length) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  const paginatedVideos = await fetchVideosByGenre(parseInt(id), 1, type as VideoType);

  const videosWithGenres = paginatedVideos.results.map(video => {
    const selectedGenres = genres.filter((genre) => video.genreIds?.includes(genre.id));
    return { ...video, genres: selectedGenres };
  });

  return NextResponse.json(videosWithGenres);
};
