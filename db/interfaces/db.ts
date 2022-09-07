import { Todo, TodoList } from './interfaces.ts';

export interface db {
    newTodo(title: string, completed: boolean, listId: string): Promise<Todo>,
    changeTodoState(uuid: string): Promise<undefined>,
    getTodoList(listId: string):Promise<TodoList | undefined>,
}