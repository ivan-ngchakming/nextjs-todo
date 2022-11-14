import { Box, IconButton, Typography } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Status, Todo } from "../type";
import { useTodo } from "../contexts/TodoContext";

const TodoItem = ({ item }: { item: Todo }) => {
  const { deleteItem } = useTodo();

  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Implement me
  };

  const handleRemove = () => {
    deleteItem(item);
  };

  return (
    <Box display="flex" alignItems="center">
      <Checkbox
        checked={item.status === Status.Done}
        onChange={handleCheck}
        inputProps={{ "aria-label": "controlled" }}
      />
      <Typography sx={{ ml: 2, flexGrow: 1 }}>{item.content}</Typography>
      <IconButton>
        <EditIcon />
      </IconButton>
      <IconButton onClick={handleRemove}>
        <DeleteIcon />
      </IconButton>
    </Box>
  );
};

export default TodoItem;
