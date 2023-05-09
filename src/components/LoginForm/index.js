import React from "react";
import "./style.css";
import { Button, TextField } from "@mui/material";


const LoginForm = ({ 
    email,
    setEmail,
    password,
    setPassword,
    onSignIn, 
    onClickSignUp,
    onEmployeeLogin,
    isEmployeeLogin,
    onOnlineUserLogin 
}) => {
  return (
    <div className="form-container">
      {
        !isEmployeeLogin ?
        (       <h3>Sign In</h3> ) 
        :
        ( <h3> Employee Sign In</h3> )
      }
      
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
      { 
        !isEmployeeLogin &&
          <span className="signup-link">
          Don't have an account? <a onClick={() => onClickSignUp()}>Sign up</a>
        </span>
      }
      
      {
        isEmployeeLogin ? (
        <>
           <span className="signup-link">
           Not an Employee ? <a onClick={() => onOnlineUserLogin()}>Click here to login as online user</a>
          </span>
        </>) 
        :
        (<>
        <span className="signup-link">
            Are you an employee ? <a onClick={() => onEmployeeLogin()}>Click here to login as employee</a>
          </span>
         
        </>)
      }
      
      
    </div>
  );
};

export default LoginForm;
