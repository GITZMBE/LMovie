import { NextResponse } from "next/server";
import { fetchPersonInfo } from "@/src/api";
import { ApiError } from "@/src/models";

export const GET = async (req: Request, context: RouteContext<'/api/person/[id]'>) => {
  const { id } = await context.params;

  const errors: ApiError[] = [];
  
  if (!id) {
    errors.push({ status: 400, message: "Id is required." });
  };
  if (isNaN(parseInt(id))) {
    errors.push({ status: 400, message: "Id must be a number." });
  }
  if (errors.length) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  const person = await fetchPersonInfo(parseInt(id));

  return NextResponse.json(person);
};
