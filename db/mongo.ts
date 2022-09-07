import { MongoClient, ObjectId } from "https://deno.land/x/atlas_sdk@v1.0.2/mod.ts";
import { db, Todo, TodoList } from "./interfaces/interfaces.ts";

import "https://deno.land/x/dotenv@v3.2.0/load.ts";
const secrets = {
  key: Deno.env.get("DATA_API_KEY"),
  app: Deno.env.get("APP_ID"),
};
if (!secrets.app || !secrets.key) {
  throw new Error("environment variable DATA_API_KEY or APP_ID not set");
}

const client = new MongoClient({
  endpoint: "https://data.mongodb-api.com/app/" + secrets.app +
    "/endpoint/data/v1",
  dataSource: "iccee0",
  auth: {
    apiKey: secrets.key,
  },
});

interface MongoTodo extends Todo {
  listId: string;
}

const db = client.database("todo");
const todos = db.collection<MongoTodo>("todos");

export default {
  async newTodo(
    title: string,
    completed: boolean,
    listId: string,
  ): Promise<Todo> {

    
    return await todos.findOne({ _id:(new ObjectId(
      (await todos.insertOne({
        title,
        completed,
        listId,
        uuid: crypto.randomUUID()
       })).insertedId||""
    ))});
  },
  async getTodoList(listId: string): Promise<TodoList | undefined> {
    return { id: listId, todos: await todos.find({ listId: listId }) };
  },
  async changeTodoState(uuid:string): Promise<undefined> {
    const todo = await todos.findOne({uuid})
    todo.completed = !todo.completed
    await todos.updateOne({uuid}, todo, {})
    return;
  }
} as db;

