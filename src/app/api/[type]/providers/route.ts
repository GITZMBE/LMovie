import { NextResponse } from "next/server";
import { fetchProviders } from "@/src/api";
import { ApiError, Provider, ProviderDto, VideoType } from "@/src/models";
import providersJSON from '@/public/api/providers.json';
import { mapProvidersDtoToProviders } from "@/src/utils/provider";

export const GET = async (req: Request, context: RouteContext<'/api/[type]/providers'>) => {
  const providers: ProviderDto[] = JSON.parse(JSON.stringify(providersJSON));
  // const { type } = await context.params;

  // const errors: ApiError[] = [];
    
  // if (!type) {
  //   errors.push({ status: 400, message: "Type is required." });
  // } 
  // if (!["movie", "series"].includes(type)) {
  //   errors.push({ status: 400, message: "Invalid video type." });
  // } 
  // if (errors.length) {
  //   return NextResponse.json({ errors }, { status: 400 });
  // }

  // const providers = await fetchProviders(type as VideoType);
  
  // return NextResponse.json(providers);
  return NextResponse.json(mapProvidersDtoToProviders(providers));
};