import "https://deno.land/x/dotenv@v3.2.0/load.ts";

import {
  Client,
  query as q,
} from "https://deno.land/x/fauna@5.0.0-deno-alpha9/mod.ts";

const secret = Deno.env.get("FAUNA_SECRET");
if (!secret) {
  throw new Error("environment variable FAUNA_SECRET not set");
}

const client = new Client({ secret });

import { Todo, TodoList, db } from "./interfaces/interfaces.ts";

export default {
  newTodo(
    title: string,
    description: string,
    completed: boolean,
    listID: string,
  ): Todo {
    return { completed, description, title };
  },
  getTodoList(listID: string): TodoList {
    return {
      id: listID,
      todos: [],
    };
  }
} as db;
