import React from "react";
import "./style.css";
import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";

const SignUpForm = ({
    userName,
    setUserName,
    email,
    setEmail,
    password,
    setPassword,
    isEmployee,
    setIsEmployee,
    onRegister
}) => {

  return (
    <div className="form-container">
      <h3>Account Registration</h3>
      <TextField
        required
        label="Username"
        variant="outlined"
        className="auth-textfield"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <TextField
        label="Email"
        variant="outlined"
        className="auth-textfield"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        variant="outlined"
        type="password"
        className="auth-textfield"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={isEmployee}
            onChange={(e) => setIsEmployee(e.target.checked)}
          />
        }
        label="Are you an employee?"
      />
      <Button
        variant="contained"
        onClick={() => onRegister()}
      >
        Register
      </Button>
    </div>
  );
};

export default SignUpForm;