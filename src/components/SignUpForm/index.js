import React, { useState } from "react";
import "./style.css";
import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { formatDate } from "../../utils/function_helper";

const SignUpForm = ({ onRegister, onBackToLogin }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [streetName, setStreetName] = useState("");
  const [streetNumber, setStreetNumber] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [cellNo, setCellNo] = useState("");
  const [birthDate, setBirthDate] = useState(null);
  const [isMember, setIsMember] = useState(false);
  const [isStudent, setIsStudent] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const VisitorDataForm = () => {
    return (
      <div>
        <TextField
          required
          label="First Name"
          variant="outlined"
          className="auth-textfield"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          required
          label="Last Name"
          variant="outlined"
          className="auth-textfield"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <TextField
          required
          label="Street Name"
          variant="outlined"
          className="auth-textfield"
          value={streetName}
          onChange={(e) => setStreetName(e.target.value)}
        />
        <TextField
          required
          label="Street Number"
          type="number"
          variant="outlined"
          className="auth-textfield"
          value={streetNumber}
          onChange={(e) => setStreetNumber(e.target.value)}
          inputProps={{
            pattern: "[0-9]{1}",
            maxLength: 1,
          }}
        />
        <TextField
          required
          label="City"
          variant="outlined"
          className="auth-textfield"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <TextField
          required
          label="Zip Code"
          variant="outlined"
          className="auth-textfield"
          value={zipcode}
          onChange={(e) => setZipcode(e.target.value)}
          inputProps={{
            pattern: "[0-9]{5}",
            inputMode: "numeric",
            maxLength: 5,
          }}
        />
        <TextField
          required
          label="Cell No"
          variant="outlined"
          className="auth-textfield"
          value={cellNo}
          onChange={(e) => setCellNo(e.target.value)}
          inputProps={{
            pattern: "[0-9]{10}",
            inputMode: "numeric",
            maxLength: 10,
          }}
        />
        <DatePicker
          label="birthdate"
          value={birthDate}
          onChange={(newValue) => setBirthDate(newValue)}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={isMember}
              onChange={(e) => setIsMember(e.target.checked)}
            />
          }
          label="Are you a member?"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={isStudent}
              onChange={(e) => setIsStudent(e.target.checked)}
            />
          }
          label="Are you a student?"
        />
      </div>
    );
  };
  const UserDataForm = () => {
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
        <Button
          variant="contained"
          onClick={() =>
            onRegister({
              firstName: firstName,
              lastName: lastName,
              streetName: streetName,
              streetNumber: streetNumber,
              city: city,
              zipcode: zipcode,
              cellNo: cellNo,
              birthDate: formatDate(birthDate),
              isMember: isMember,
              isStudent: isStudent,
              email: email,
              password: password,
              userName: userName,
              roleId: 3,
            })
          }
        >
          Register
        </Button>
      </div>
    );
  };

  return (
    <div className="form-container">
      <h3>Account Registration</h3>
      <VisitorDataForm/>
      <span className="signup-link">
        Back to <a onClick={() => onBackToLogin()}>Login</a>
      </span>
    </div>
  );
};

export default SignUpForm;
