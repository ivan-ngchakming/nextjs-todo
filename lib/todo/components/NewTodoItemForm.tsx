import { Box, Button, Card, CardContent, TextField } from "@mui/material";

const NewItemForm = () => {
  return (
    <Card>
      <CardContent>
        <TextField fullWidth label="Enter Title" />
        <Box display="flex" sx={{ justifyContent: "center", mt: 4 }}>
          <Button variant="contained">Add</Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default NewItemForm;
