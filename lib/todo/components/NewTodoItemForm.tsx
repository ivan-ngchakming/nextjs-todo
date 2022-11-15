import { Box, Button, Card, CardContent, TextField } from "@mui/material";
import { useState } from "react";
import { useTodo } from "../contexts/TodoContext";

const NewItemForm = () => {
  const { addItem } = useTodo();
  const [userInput, setUserInput] = useState<string>("");

  const handleUserInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const handleAdd = () => {
    addItem(userInput);
    setUserInput("");
  };

  return (
    <Card>
      <CardContent>
        <TextField
          value={userInput}
          onChange={handleUserInputChange}
          fullWidth
          label="Enter Title"
        />
        <Box display="flex" sx={{ justifyContent: "center", mt: 4 }}>
          <Button
            variant="contained"
            onClick={handleAdd}
            disabled={userInput === ""}
          >
            Add
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default NewItemForm;
