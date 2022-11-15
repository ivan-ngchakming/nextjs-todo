import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { v4 as uuid } from "uuid";
import { Status, Todo } from "../type";

type TodoContextValue = {
  items: Todo[];
  initItems: (initItems: Todo[]) => void;
  addItem: (content: string) => void;
  editItem: (item: Todo) => Promise<void>;
  deleteItem: (item: Todo) => void;
};

const TodoContext = createContext<TodoContextValue>(null as any);

const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const itemsInitialized = useRef<boolean>(false);
  const [items, setItems] = useState<Todo[]>([]);

  const initItems = useCallback((initItems: Todo[]) => {
    setItems(initItems);
    itemsInitialized.current = true;
  }, []);

  const addItem = useCallback((content: string) => {
    const newTodoItem: Todo = {
      id: uuid(),
      content,
      status: Status.Unfinished,
    };
    setItems((prev) => [...prev, newTodoItem]);
  }, []);

  const editItem = useCallback(
    async (item: Todo) => {
      if (itemsInitialized.current) {
        const itemIndex = items.findIndex((i) => i.id === item.id);
        const newItems = items.slice();
        newItems[itemIndex] = item;
        setItems(newItems);
      } else {
        const newItems: Todo[] = await fetch("/api/todo").then((res) =>
          res.json()
        );
        const itemIndex = newItems.findIndex((i) => i.id === item.id);
        newItems[itemIndex] = item;
        setItems(newItems);
        itemsInitialized.current = true;
      }
    },
    [items]
  );

  const deleteItem = useCallback((item: Todo) => {
    setItems((prev) => prev.filter((i) => i.id !== item.id));
  }, []);

  const syncTodoData = async (todoItems: Todo[]) => {
    fetch("/api/todo", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todoItems),
    });
  };

  useEffect(() => {
    if (itemsInitialized.current) {
      syncTodoData(items);
    }
  }, [items]);

  const value = useMemo(
    () => ({
      items,
      initItems,
      addItem,
      editItem,
      deleteItem,
    }),
    [addItem, deleteItem, editItem, initItems, items]
  );

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export const useTodo = (initItems?: Todo[]) => {
  const context = useContext(TodoContext);

  useEffect(() => {
    if (initItems) {
      context.initItems(initItems);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return context;
};

export default TodoProvider;
