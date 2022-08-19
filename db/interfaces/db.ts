import { Todo, TodoList } from './interfaces.ts';

export interface db {
    newTodo(title: string, description: string, completed: boolean, listName: string): Promise<string>,
    getTodoList(listName: string):Promise<TodoList | undefined>,
}