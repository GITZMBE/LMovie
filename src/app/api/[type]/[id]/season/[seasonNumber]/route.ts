
import { fetchSeriesSeasonInfo } from "@/src/api";
import { ApiError } from "@/src/models";
import { NextResponse } from "next/server";

export const GET = async (req: Request, context: RouteContext<'/api/[type]/[id]/season/[seasonNumber]'>) => {
  const { type, id, seasonNumber } = await context.params;
  
  const errors: ApiError[] = [];
  
  if (!type) {
    errors.push({ status: 400, message: "Type is required." });
  } 
  if (type !== 'series') {
    errors.push({ status: 400, message: "Invalid video type." });
  } 
  if (!id) {
    errors.push({ status: 400, message: "Id is required." });
  };
  if (isNaN(parseInt(id))) {
    errors.push({ status: 400, message: "Id must be a number." });
  }
  if (!seasonNumber) {
    errors.push({ status: 400, message: "Season number is required." });
  };
  if (isNaN(parseInt(seasonNumber))) {
    errors.push({ status: 400, message: "Season number must be a number." });
  }
  if (errors.length) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  const season = await fetchSeriesSeasonInfo(parseInt(id), parseInt(seasonNumber));

  return NextResponse.json(season);
};