import { Button } from "@mui/base";
import { TextField } from "@mui/material";
import React, { useState } from "react";

const UserDataForm = ({handleBack, handleRegister}) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
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
      <div className="step-buttons-container">
        <Button variant="contained" color="primary" onClick={handleBack}>
          Back
        </Button>
        <Button
          variant="contained"
          onClick={() => handleRegister(userName, email, password)}
        >
          Register
        </Button>
      </div>
    </div>
  );
};

export default UserDataForm;
