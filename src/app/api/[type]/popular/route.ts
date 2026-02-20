import { NextResponse } from "next/server";
import { fetchPopular, fetchTopVideos } from "@/src/api";
import { ApiError, VideoType } from "@/src/models";

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
  
  return NextResponse.json(videos);
};