import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { v4 as uuid } from "uuid";
import { Status, Todo } from "../type";

type TodoContextValue = {
  items: Todo[];
  addItem: (content: string) => void;
  editItem: (item: Todo) => void;
  deleteItem: (item: Todo) => void;
};

const TodoContext = createContext<TodoContextValue>(null as any);

const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<Todo[]>([]);

  const addItem = useCallback((content: string) => {
    const newTodoItem: Todo = {
      id: uuid(),
      content,
      status: Status.Unfinished,
    };
    setItems((prev) => [...prev, newTodoItem]);
  }, []);

  const editItem = useCallback((item: Todo) => {
    setItems((prev) => [
      ...prev.filter((i) => i.id !== item.id),
      {
        ...item,
      },
    ]);
  }, []);

  const deleteItem = useCallback((item: Todo) => {
    setItems((prev) => prev.filter((i) => i.id !== item.id));
  }, []);

  const syncTodoData = async (todoItems: Todo[]) => {
    fetch("./api/todo", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todoItems),
    });
  };

  useEffect(() => {
    syncTodoData(items);
  }, [items]);

  const value = useMemo(
    () => ({
      items,
      addItem,
      editItem,
      deleteItem,
    }),
    [addItem, deleteItem, editItem, items]
  );

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export const useTodo = () => {
  return useContext(TodoContext);
};

export default TodoProvider;
