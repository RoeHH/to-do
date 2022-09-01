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
    fetch("http://localhost:8000/api/changeTodoState/" + props.todo._id)
  }
  return (
    <li onClick={changeState} class={tw`cursor-pointer` + (done ? tw`font-light line-through` : tw`font-medium hover:font-light`)}>{props.todo.title}</li>
  );
}
