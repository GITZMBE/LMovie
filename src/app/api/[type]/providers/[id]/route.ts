import { NextResponse } from "next/server";
import { fetchVideosByProvider } from "@/src/api";
import { ApiError, Genre, VideoType } from "@/src/models";
import genresJSON from "@/public/api/genres.json";

export const GET = async (req: Request, context: RouteContext<'/api/[type]/providers/[id]'>) => {
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
  }
  if (isNaN(parseInt(id))) {
    errors.push({ status: 400, message: "Id must be a number." });
  }
  if (errors.length) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  const url = new URL(req.url);
  const pageParam = url.searchParams.get("page") || "1";
  const page = isNaN(parseInt(pageParam)) ? 1 : parseInt(pageParam);

  const paginated = await fetchVideosByProvider(parseInt(id), (type as VideoType), page);
  const genres = (await JSON.parse(JSON.stringify(genresJSON))) as Genre[];

  const videosWithGenres = paginated.results.map((video) => {
    const selectedGenres = genres.filter((genre) => video.genreIds?.includes(genre.id));
    return { ...video, genres: selectedGenres };
  });

  return NextResponse.json({ results: videosWithGenres, totalPages: paginated.totalPages });
};