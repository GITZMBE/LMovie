import { NextResponse } from "next/server";
import genresJSON from "@/public/api/genres.json";
import { ApiError, Genre } from "@/src/models";

export const GET = async () => {
  const genres = await JSON.parse(JSON.stringify(genresJSON));
  
  return NextResponse.json(genres);
};

export const POST = async (request: Request) => {
  const { genreIds } = await request.json();
  const errors: ApiError[] = [];
  
  if (!genreIds) {
    errors.push({ status: 400, message: "Genre Ids are required." });
  }
  if (errors.length) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  const genres = await JSON.parse(JSON.stringify(genresJSON)) as Genre[];
  const selectedGenres = genres.filter((genre) => genreIds.includes(genre.id));

  return NextResponse.json(selectedGenres);
};
