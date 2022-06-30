import { MiddlewareHandlerContext } from "$fresh/server.ts";
import db from "db/fauna.ts";
import { TodoLists } from "db/interfaces/interfaces.ts";

export async function handler(
  req: Request,
  ctx: MiddlewareHandlerContext<TodoLists>,
) {
  if (new URL(req.url).pathname.split("/")[1] === "favicon.ico") {
    return fetch("https://roeh.ch/img/logo.png");
  }
  ctx.state.lists = [];
  req.headers.get("Cookie")?.split(";").map((cookie) => {
    console.log(cookie.split("=")[1]);
    
    const list = db.getTodoList(cookie.split("=")[1])
    ctx.state.lists.push(list);
    console.log(list);
    
  })
  const resp = await ctx.next();
  resp.headers.set("Set-Cookie", "list=Hello");
  
  return resp;
}
