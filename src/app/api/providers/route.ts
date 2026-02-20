import { NextResponse } from "next/server";
import { ProviderDto } from "@/src/models";
import providersJSON from '@/public/api/providers.json';
import { mapProvidersDtoToProviders } from "@/src/utils/provider";

export const GET = async (req: Request,) => {
  const providers: ProviderDto[] = JSON.parse(JSON.stringify(providersJSON));
  
  return NextResponse.json(mapProvidersDtoToProviders(providers));
};