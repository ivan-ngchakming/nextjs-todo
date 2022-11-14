import { Box, IconButton, Typography } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Status, Todo } from "../type";

const TodoItem = ({ item }: { item: Todo }) => {
  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Implement me
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
      <IconButton>
        <DeleteIcon />
      </IconButton>
    </Box>
  );
};

export default TodoItem;
