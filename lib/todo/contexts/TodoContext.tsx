import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { Todo } from "../type";

type TodoContextValue = {
  items: Todo[];
  addItem: (item: Todo) => void;
  editItem: (item: Todo) => void;
  deleteItem: (item: Todo) => void;
};

const TodoContext = createContext<TodoContextValue>(null as any);

const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<Todo[]>([]);

  const addItem = useCallback((item: Todo) => {
    // Implement me
  }, []);

  const editItem = useCallback((item: Todo) => {
    // Implement me
  }, []);

  const deleteItem = useCallback((item: Todo) => {
    // Implement me
  }, []);

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
