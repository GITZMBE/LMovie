import { fetchInfo } from "@/src/api";
import { ApiError, VideoType } from "@/src/models";
import { NextResponse } from "next/server";

export const GET = async (req: Request, context: RouteContext<'/api/[type]/[id]'>) => {
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

  return NextResponse.json(video);
};