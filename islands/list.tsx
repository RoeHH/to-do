/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { TodoList } from "db/interfaces";
import { useState } from "preact/hooks";
import TodoField from "islands/Todo.tsx";

export default function List({list: list}:{list: TodoList} ) {
  
  //SORT
  //list.todos = list.todos.sort((a,b) => (a.completed === b.completed) ? 0 : a.completed? 1 : -1)

  const [listState, setList] = useState(list);


  const newTodo = async (event: { key: string; target: any }) => {
    if(event.key !== "Enter")
      return
    console.log(event.target.value);
    listState.todos.push({completed:false,title:event.target.value,uuid: ""})
    setList(listState)
    const res = await fetch(`http://localhost:8000/api/new/${list.id}?todo=${event.target.value}` )
    console.log(await res.json());
    
    

  }
  //      <h2 class={tw`font-medium leading-tight text-2xl mt-0 mb-2 text-blue-600`}>{list.name}</h2>
  return (
    <div>
      <h1 class={tw`flex items-center justify-between text-5xl font-200`}><span>Todos</span><em class={tw`text-3xl text-gray-300`}>0/3</em></h1>
      <ul class={tw`list-none list-inside	`}>
        {listState.todos.map(todo=><TodoField todo={todo} />)}
        <input onKeyPress={newTodo} type="text" class={tw`block w-96 py-2 px-4 text-2xl font-300 placeholder:italic placeholder:text-gray-400 bg-gray-50 rounded-lg outline-none`} name="todo" placeholder="...?" autocomplete="off" data-ddg-inputtype="unknown"></input>
      </ul>
    </div>
  );
}
  