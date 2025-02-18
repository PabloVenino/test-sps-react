import React, { useState } from "react";
import { 
  Container, TextField, Button, 
  Card, CardContent, Typography, 
  Snackbar } 
from "@mui/material";
import { useAuth } from "../authProvider";

export const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleLogin = async () => {
    const result = await login(email, password);  // Get the result from the login function
    
    setSnackbarMessage(result.message);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false); // Close the snackbar when it's dismissed
  };

  return (
    <Container maxWidth="xs">
      <Card>
        <CardContent>
          <Typography variant="h5">Login</Typography>
          <TextField 
            fullWidth 
            margin="normal" 
            label="Email" 
            onChange={(e) => setEmail(e.target.value)} 
          />
          <TextField 
            fullWidth 
            margin="normal" 
            label="Password" 
            type="password" 
            onChange={(e) => setPassword(e.target.value)} 
          />
          <Button fullWidth variant="contained" color="primary" onClick={handleLogin}>
            Login
          </Button>
        </CardContent>
      </Card>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
    </Container>
  );
};
