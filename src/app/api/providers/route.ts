import { NextResponse } from "next/server";
import { ProviderDto, ProviderInternal } from "@/src/models";
import providersJSON from '@/public/api/providers-internal.json';
import { mapProvidersDtoToProviders } from "@/src/utils/provider";

export const GET = async (req: Request,) => {
  const providers: ProviderInternal[] = JSON.parse(JSON.stringify(providersJSON));
  
  return NextResponse.json(providers);
};