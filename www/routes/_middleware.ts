import { MiddlewareHandlerContext } from "$fresh/server.ts";

interface State {
  data: string;
}

export async function handler(
  req: Request,
  ctx: MiddlewareHandlerContext<State>,
) {
  if (new URL(req.url).pathname.split("/")[1] === "favicon.ico") {
    return fetch("https://roeh.ch/img/logo.png");
  }
  const resp = await ctx.next();
  return resp;
}
