import { CheckBox } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const TodoItem = ({ title }: { title: string }) => {
  return (
    <Box display="flex">
      <CheckBox />
      <Typography sx={{ ml: 2, flexGrow: 1 }}>{title}</Typography>
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
