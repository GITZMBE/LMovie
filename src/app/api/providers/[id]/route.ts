import { ApiError, ProviderInternal } from "@/src/models";
import { NextResponse } from "next/server";
import providersJSON from '@/public/api/providers-internal.json';

export const GET = async (req: Request, context: RouteContext<'/api/[type]/[id]'>) => {
  const { id } = await context.params;
  
  const errors: ApiError[] = [];

  if (!id) {
    errors.push({ status: 400, message: "Id is required." });
  };
  if (isNaN(parseInt(id))) {
    errors.push({ status: 400, message: "Id must be a number." });
  }

  const providers: ProviderInternal[] = JSON.parse(JSON.stringify(providersJSON));
  const provider = providers.find(p => p.id === parseInt(id));

  if (!provider) {
    errors.push({ status: 404, message: "Provider not found." });
  }
  if (errors.length) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  return NextResponse.json(provider);
};