/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { TodoList } from "db/interfaces";
import TodoField from "islands/Todo.tsx";

export default function List({list: list}:{list: TodoList} ) {
  
  //SORT
  //list.todos = list.todos.sort((a,b) => (a.completed === b.completed) ? 0 : a.completed? 1 : -1)

  const newTodo = async (event: { key: string; target: any }) => {
    if(event.key !== "Enter")
      return
    console.log(event.target.value);
    console.log(await fetch(`http://localhost:8000/api/new/${list.name}?todo=${event.target.value}` ));
    
    

  }
  return (
    <div>
      <h2 class={tw`font-medium leading-tight text-2xl mt-0 mb-2 text-blue-600`}>{list.name}</h2>
      <ul class={tw`list-disc list-inside	`}>
        {list.todos.map(todo=><TodoField todo={todo} />)}
        <input onKeyPress={newTodo} type="text" class={tw`block w-max py-2 px- font-300 placeholder:italic placeholder:text-gray-400 rounded-lg outline-none`} name="todo" placeholder="...?" autocomplete="off" data-ddg-inputtype="unknown"></input>
      </ul>
    </div>
  );
}
  