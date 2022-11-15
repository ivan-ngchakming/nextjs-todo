import { Box, Button, Checkbox, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { GetServerSideProps } from "next";
import Router from "next/router";
import { useState } from "react";
import { useTodo } from "../../lib/todo/contexts/TodoContext";
import { loadTodoItem } from "../../lib/todo/service";
import { Status, Todo } from "../../lib/todo/type";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const item = context.params
    ? loadTodoItem(context.params.id as string)
    : null;

  return {
    props: { item }, // will be passed to the page component as props
  };
};

const EditTodoItemPage = ({ item }: { item: Todo }) => {
  const { editItem } = useTodo();

  const [content, setContent] = useState<string>(item ? item.content : "");
  const [status, setStatus] = useState<Status>(
    item ? item.status : Status.Unfinished
  );
  const [dueDate, setDueDate] = useState<string>(
    item && item.dueDate ? item.dueDate : ""
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    editItem({
      ...item,
      content,
      status,
      dueDate,
    });
    Router.push("/");
  };

  if (!item) {
    return (
      <Container maxWidth="sm">
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h5" textAlign="center" sx={{ mt: 6, mb: 2 }}>
            Item Not Found
          </Typography>
          <Button href="/">Back</Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <form onSubmit={handleSubmit}>
        <Typography variant="h6" textAlign="center" sx={{ m: 2 }}>
          Edit Item
        </Typography>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mx: 12 }}
        >
          <Typography>Completed: </Typography>{" "}
          <Checkbox
            checked={status === Status.Done}
            onChange={() =>
              setStatus((prev) =>
                prev === Status.Done ? Status.Unfinished : Status.Done
              )
            }
          />
        </Box>

        <TextField
          label="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          fullWidth
          sx={{ m: 1 }}
        />

        <TextField
          label="Due Date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          type="date"
          fullWidth
          sx={{ m: 1 }}
          InputLabelProps={{
            shrink: true,
          }}
        />

        <Box
          display="flex"
          justifyContent="space-around"
          alignItems="center"
          sx={{ mt: 4 }}
        >
          <Button
            variant="contained"
            color="error"
            sx={{ minWidth: 100 }}
            href="/"
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="success"
            sx={{ minWidth: 100 }}
            type="submit"
          >
            Save
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default EditTodoItemPage;
