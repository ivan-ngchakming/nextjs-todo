import { CheckBox } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Todo } from "../type";

const TodoItem = ({ item }: { item: Todo }) => {
  return (
    <Box display="flex">
      <CheckBox />
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
