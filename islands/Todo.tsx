/** @jsx h */
import { h } from "preact";
import { useState } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { tw } from "@twind";
import { Todo } from "db/interfaces"

interface CounterProps {
  todo: Todo;
}

export default function TodoField(props: CounterProps) { 
  
  const [done, setDone] = useState(props.todo.completed);
  const changeState = () => {
    setDone(!done);
    fetch("http://localhost:8000/api/changeTodoState/" + props.todo.uuid)
  }

  if(done)
    return (
      <li onClick={changeState} class={tw`flex items-center justify-between gap-2 px-3 py-1.5`}>
        <div class={tw`flex items-center justify-center w-5 h-5 border-2 rounded-full border-gray-200`}><span class="inline-block w-[1.5px] h-[1.5px] rounded-full"></span></div>
        <label class={tw`flex-1 text-xl text-gray-700 font-300 line-through !text-gray-400`}>{props.todo.title}</label>
      </li>
    );

  return (
    <li onClick={changeState} class={tw`flex items-center justify-between gap-2 px-3 py-1.5`}>
      <div class={tw`flex items-center justify-center w-5 h-5 border-2 border-gray-300 rounded-full`}></div>
      <label class={tw`flex-1 text-xl text-gray-700 font-300`}>{props.todo.title}</label>
    </li>
  );
}
