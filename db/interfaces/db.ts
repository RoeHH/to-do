import { Todo, TodoList } from './interfaces.ts';
import { ObjectId } from "https://deno.land/x/atlas_sdk@v1.0.2/mod.ts";

export interface db {
    newTodo(title: string, completed: boolean, listName: string): Promise<Todo>,
    changeTodoState(_id: ObjectId): Promise<undefined>,
    getTodoList(listName: string):Promise<TodoList | undefined>,
}