import React from "react";
import "./style.css";
import { Button, TextField } from "@mui/material";


const LoginForm = ({ 
    email,
    setEmail,
    password,
    setPassword,
    onSignIn, 
    onClickSignUp 
}) => {
  return (
    <div className="form-container">
      <h3>Sign In</h3>
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
      <Button variant="contained" onClick={onSignIn}>
        Sign In
      </Button>
      <span className="signup-link">
        Don't have an account? <a onClick={() => onClickSignUp()}>Sign up</a>
      </span>
    </div>
  );
};

export default LoginForm;
