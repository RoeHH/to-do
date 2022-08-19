import { Todo } from './todo.ts';

export interface TodoList {
    name: string;
    todos: Todo[];
}

export interface TodoLists {
    lists: TodoList[];
}