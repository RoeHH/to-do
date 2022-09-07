import { HandlerContext } from "$fresh/server.ts";
import db from "db/mongo.ts";

export const handler = async (_req: Request, ctx: HandlerContext): Promise<Response> => {
  return new Response(await db.changeTodoState(ctx.params.id))
};
