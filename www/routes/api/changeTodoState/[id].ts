import { HandlerContext, PageProps } from "$fresh/server.ts";
import { changeTodoState } from "db/mongo.ts";

export const handler = async (_req: Request, ctx: HandlerContext): Response => {
  return await changeTodoState(_req)
};
