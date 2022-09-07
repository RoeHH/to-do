import { HandlerContext, PageProps } from "$fresh/server.ts";
import db from "db/mongo.ts";
import { ObjectId } from "https://deno.land/x/atlas_sdk@v1.0.2/mod.ts";

export const handler = async (req: Request, ctx: HandlerContext): Promise<Response> => {
    const url = new URL(req.url);
    const todo = url.searchParams.get("todo") || "";
    console.log(todo);
    
    return new Response(await db.newTodo(todo,false,ctx.params.listid).then(td => JSON.stringify(td)))
};
