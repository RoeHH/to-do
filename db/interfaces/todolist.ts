import { Todo } from './todo.ts';

export interface TodoList {
    id: string;
    todos: Todo[];
}

export interface TodoLists {
    lists: TodoList[];
}