/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { Handlers, PageProps } from "$fresh/server.ts"

import { TodoLists } from "db/interfaces/interfaces.ts";


export const handler: Handlers<any, TodoLists> = {
  GET(_req, ctx) {
    return ctx.render(TodoLists)
  },
};

export default function Home(props: PageProps<TodoLists | null>) {
  return (
    <div class={tw`p-4 mx-auto max-w-screen-md`}>
      <h1>TODO</h1>
      {props.}
    </div>
  );
}
