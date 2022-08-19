import "https://deno.land/x/dotenv@v3.2.0/load.ts";
import { MongoClient } from "https://deno.land/x/atlas_sdk@v1.0.2/mod.ts";
import { db, Todo, TodoList } from "./interfaces/interfaces.ts";

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
  listName: string;
}

const db = client.database("todo");
const todos = db.collection<MongoTodo>("todos");

export default {
  async newTodo(
    title: string,
    description: string,
    completed: boolean,
    listName: string,
  ): Promise<string> {
    return (await todos.insertOne({
      title,
      description,
      completed,
      listName,
    })).insertedId || "";
  },
  async getTodoList(listName: string): Promise<TodoList | undefined> {
    return { name: listName, todos: await todos.find({ listName: listName }) };
  },
} as db;
