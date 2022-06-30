/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { Handlers } from "$fresh/server.ts";


export const handler: Handlers = {
  async GET(req, ctx) {
    const resp = await ctx.render();
    if(new URL(req.url).)
    resp.headers.set("Set-Cookie", "list=Hello");
    return resp;
  },
};

export default function Home() {
  return (
    <div class={tw`p-4 mx-auto max-w-screen-md`}>
      <h1>TODO</h1>
    </div>
  );
}
