import { NextResponse } from "next/server";
import genresJSON from "@/public/api/genres.json";

export const GET = async () => {
  const genres = await JSON.parse(JSON.stringify(genresJSON));
  
  return NextResponse.json(genres);
};