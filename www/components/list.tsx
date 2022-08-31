/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { TodoList } from "db/interfaces";
import TodoField from "islands/Todo.tsx";

export default function List({list: list}:{list: TodoList} ) {
  
  //SORT
  //list.todos = list.todos.sort((a,b) => (a.completed === b.completed) ? 0 : a.completed? 1 : -1)
  
  return (
    <div>
      <h2 class={tw`font-medium leading-tight text-2xl mt-0 mb-2 text-blue-600`}>{list.name}</h2>
      <ul>
        {list.todos.map(todo=><TodoField todo={todo} />)}
      </ul>
    </div>
  );
}
  