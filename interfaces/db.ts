import { Todo } from './todo.ts';

export interface db {
    newTodo(title: string, description: string, completed: boolean, listID: string): Todo,
    getTodoList(listID: string):Todo[],
}