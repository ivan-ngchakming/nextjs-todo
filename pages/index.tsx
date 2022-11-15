import { Box, Container } from "@mui/material";
import { GetServerSideProps } from "next";
import { NewItemForm, TodoItem } from "../lib/todo/components";
import { useTodo } from "../lib/todo/contexts/TodoContext";
import { loadTodoItems } from "../lib/todo/service";
import { Todo } from "../lib/todo/type";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const todoItems = loadTodoItems();
  return {
    props: { items: todoItems }, // will be passed to the page component as props
  };
};

export default function Home({ items: initItems }: { items: Todo[] }) {
  const { items } = useTodo(initItems);

  return (
    <Box>
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <NewItemForm />
        <Box mt={6}>
          {items.map((item) => (
            <TodoItem key={item.id} item={item} />
          ))}
        </Box>
      </Container>
    </Box>
  );
}
