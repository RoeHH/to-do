/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { Handlers, PageProps } from "$fresh/server.ts"
import { CtxState } from "./_middleware.ts";
import List from "islands/list.tsx"


export const handler: Handlers<any, CtxState> = {
  GET(req, ctx) {    
    //return Response.json(ctx.state.lists)

    return ctx.render(ctx.state);
  },
};

export default function Home({ data }: PageProps<CtxState>) { 
  const lists = data?.lists ? data.lists : []
  return (
    <div>
      <User user={data.user} lists={lists} />
      <div class={tw`mt-15 p-4 mx-auto max-w-min select-none`}>
      
        {lists.map((list)=> <List list={list} />)}
    </div>
    </div>
  );
}

function Header({user, lists}: CtxState){
  return (
    <header class={tw`mx-52 mt-2`}>
      <h1 class={tw`font-medium leading-tight text-5xl text-blue-600 w-56 mx-auto`}>TODO</h1>
    </header>

  )
}

function User({user}: CtxState){
  if(user){
    return (
       <div class={tw`absolute top-2 right-52 `}><img
       src={user.avatarUrl}
       class={tw`rounded-full w-12`}
       alt="Avatar"
     />{user.userName}</div>
    )
  }
  return (
    <a href="/login">Login With Github</a>
  )
  
}
