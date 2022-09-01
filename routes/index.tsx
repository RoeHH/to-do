/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { Handlers, PageProps } from "$fresh/server.ts"
import { TodoLists } from "db/interfaces";
import List from "islands/list.tsx"


export const handler: Handlers<any, TodoLists> = {
  GET(req, ctx) {    
    //return Response.json(ctx.state.lists)

    return ctx.render(ctx.state);
  },
};

export default function Home({ data }: PageProps<TodoLists | null>) { 
  const lists = data?.lists ? data.lists : [] 
  return (
    <div class={tw`p-4 mx-auto max-w-min select-none`}>
      <h1 class={tw`font-medium leading-tight text-5xl  text-blue-600`}>TODO</h1>
        {lists.map((list)=> <List list={list} />)}
    </div>
  );
}
