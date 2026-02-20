import { NextResponse } from "next/server";
import localesJSON from "@/public/api/locales.json";

export const GET = async () => {
  const locales = await JSON.parse(JSON.stringify(localesJSON));
  
  return NextResponse.json(locales);
};