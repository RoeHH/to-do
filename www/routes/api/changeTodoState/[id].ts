import { HandlerContext, PageProps } from "$fresh/server.ts";
import db from "db/mongo.ts";
import { ObjectId } from "https://deno.land/x/atlas_sdk@v1.0.2/mod.ts";

export const handler = async (_req: Request, ctx: HandlerContext): Promise<Response> => {
  return new Response(await db.changeTodoState(new ObjectId(ctx.params.id)))
};
