import { MiddlewareHandlerContext } from "$fresh/server.ts";
import db from "db/mongo.ts";
import { TodoLists } from "db/interfaces/interfaces.ts";
import { getCookies, setCookie, Cookie } from "https://deno.land/std@0.146.0/http/cookie.ts"


export async function handler(
  req: Request,
  ctx: MiddlewareHandlerContext<TodoLists>,
) {
  if (new URL(req.url).pathname.split("/")[1] === "favicon.ico") {
    return fetch("https://roeh.ch/img/logo.png");
  }
  ctx.state.lists = [];
  const listsString = getCookies(req.headers).lists;
  if(listsString !== undefined) {
    const lists = listsString.split("-")    
    for (const list of lists) {
      ctx.state.lists.push(await db.getTodoList(list) || { name: list, todos: [] });
    }
  }
  

  /*
  req.headers.get("Cookie")?.split(";").map((cookie) => {
    console.log(cookie.split("=")[1]);
    
    const list = db.getTodoList(cookie.split("=")[1])
    ctx.state.lists.push(list);
    console.log(list);
    
  })*/
  const resp = await ctx.next();

  setCookie(resp.headers, { name: "lists", value: "W-s-d-ad", maxAge: 60 * 60 * 24 * 365 });
  
  return resp;
}
