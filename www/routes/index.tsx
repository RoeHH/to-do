/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { Handlers, PageProps } from "$fresh/server.ts"
 import { TodoLists } from "db/interfaces/interfaces.ts";


export const handler: Handlers<any, TodoLists> = {
  GET(req, ctx) {    
    return ctx.render(ctx.state.lists);
  },
};

export default function Home({ data }: PageProps<TodoLists | null>) {
  return (
    <div class={tw`p-4 mx-auto max-w-screen-md`}>
      <h1>TODO</h1>
       {JSON.stringify(data)}
    </div>
  );
}
