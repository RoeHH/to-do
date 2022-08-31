/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { Handlers, PageProps } from "$fresh/server.ts"
import { TodoLists } from "db/interfaces";
import List from "components/list.tsx"


export const handler: Handlers<any, TodoLists> = {
  GET(req, ctx) {    
    //return Response.json(ctx.state.lists)

    return ctx.render(ctx.state);
  },
};

export default function Home({ data }: PageProps<TodoLists | null>) { 
  return (
    <div class={tw`p-4 mx-auto max-w-screen-md`}>
      <h1>TODO</h1>
        {data?.lists.map((list)=> <List list={list} />)}
    </div>
  );
}
