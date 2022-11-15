import type { NextApiRequest, NextApiResponse } from "next";
import { loadTodoItems, saveTodoItems } from "../../lib/todo/service";
import { Todo } from "../../lib/todo/type";

export default function todoHandler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req;

  let data: Todo[];

  switch (method) {
    case "GET":
      data = loadTodoItems();
      res.status(200).json(data);
      break;
    case "PUT":
      data = saveTodoItems(body);
      res.status(200).json(data);
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
