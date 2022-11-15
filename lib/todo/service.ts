import fs from "fs";
import path from "path";
import { Todo } from "./type";

const TODO_ITEMS_JSON_FILE = path.resolve(
  __dirname.substring(0, __dirname.indexOf(".next") + 5),
  "./todoItems.json"
);

export const loadTodoItems = () => {
  try {
    const data = JSON.parse(fs.readFileSync(TODO_ITEMS_JSON_FILE).toString());
    return data;
  } catch (e: unknown) {
    if (e instanceof Error && e.message.includes("no such file or directory")) {
      fs.writeFileSync(TODO_ITEMS_JSON_FILE, JSON.stringify([], null, 4));
      return [];
    }
    throw e;
  }
};

export const saveTodoItems = (items: Todo[]) => {
  fs.writeFileSync(TODO_ITEMS_JSON_FILE, JSON.stringify(items, null, 4));
  return loadTodoItems();
};
