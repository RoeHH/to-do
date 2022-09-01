import "https://deno.land/x/dotenv@v3.2.0/load.ts";
import { MongoClient, ObjectId } from "https://deno.land/x/atlas_sdk@v1.0.2/mod.ts";
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
    completed: boolean,
    listName: string,
  ): Promise<Todo> {

    console.log(ObjectId.generate().toString());
    
    return await todos.findOne({ _id:(new ObjectId(
      (await todos.insertOne({
        title,
        completed,
        listName,
        _id: ObjectId.createFromTime(new Date().getTime()).toString()
       })).insertedId||""
    ))});
  },
  async getTodoList(listName: string): Promise<TodoList | undefined> {
    return { name: listName, todos: await todos.find({ listName: listName }) };
  },
  async changeTodoState(_id:ObjectId): Promise<undefined> {
    const todo = await todos.findOne({_id})
    todo.completed = !todo.completed
    await todos.updateOne({_id}, todo, {})
    return;
  }
} as db;

