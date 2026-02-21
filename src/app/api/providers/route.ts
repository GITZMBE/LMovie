import { NextResponse } from "next/server";
import { ProviderInternal } from "@/src/models";
import providersJSON from '@/public/api/providers-internal.json';

export const GET = async (req: Request,) => {
  const providers: ProviderInternal[] = JSON.parse(JSON.stringify(providersJSON));
  
  return NextResponse.json(providers);
};