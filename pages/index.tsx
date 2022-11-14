import { Box, Container } from "@mui/material";
import { Navbar } from "../lib/shared/components";
import { NewItemForm, TodoItem } from "../lib/todo/components";
import { useTodo } from "../lib/todo/contexts/TodoContext";

export default function Home() {
  const { items } = useTodo();

  return (
    <Box>
      <Navbar />
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
