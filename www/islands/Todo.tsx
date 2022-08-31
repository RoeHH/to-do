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
  console.log(props.todo.completed);
  
  const [done, setDone] = useState(props.todo.completed);
  return (
    <li class={done ? tw`font-light	opacity-100 line-through` : tw`font-medium hover:opacity-100`}>
      <button onClick={() => setDone(!done)}>+</button>
      {done ? "t": "f"}{props.todo.title}
      </li>
  );
}
