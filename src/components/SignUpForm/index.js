import React, { useState } from "react";
import "./style.css";
import {
  Alert,
  Button,
  Checkbox,
  FormControlLabel,
  Snackbar,
  Step,
  StepLabel,
  Stepper,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { formatDate } from "../../utils/function_helper";

const SignUpForm = ({ onRegister, onBackToLogin }) => {
  const [activeStep, setActiveStep] = useState(0);
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
  const [isVisitorDataError, setIsVisitorDataError] = useState(false);

  const getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return <VisitorDataForm />;
      case 1:
        return <UserDataForm />;
      default:
        return null;
    }
  };

  const handleNext = () => {
    if (
      !firstName ||
      !lastName ||
      !streetName ||
      !streetNumber ||
      !city ||
      !zipcode ||
      !cellNo ||
      !birthDate
    ) {
      setIsVisitorDataError(true);
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
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
        <div className="step-buttons-container">
          <Button variant="contained" color="primary" onClick={handleBack}>
            Back
          </Button>
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
      </div>
    );
  };

  return (
    <div className="form-container">
      <h3>Account Registration</h3>
      <div className="signup-stepper-container">
        <Stepper activeStep={activeStep}>
          <Step>
            <StepLabel>Visitor Data</StepLabel>
          </Step>
          <Step>
            <StepLabel>User Data</StepLabel>
          </Step>
        </Stepper>
      </div>
      {getStepContent(activeStep)}
      <span className="signup-link">
        Back to <a onClick={() => onBackToLogin()}>Login</a>
      </span>
      <Snackbar
        open={isVisitorDataError}
        autoHideDuration={3000}
        onClose={() => setIsVisitorDataError(false)}
      >
        <Alert onClose={() => setIsVisitorDataError(false)} severity="error">
          Visitor data is not completed!
        </Alert>
      </Snackbar>
    </div>
  );
};

const VisitorDataForm = () => {
  return (
    <div>
      <TextField
        required
        key="first_name"
        label="First Name"
        variant="outlined"
        className="auth-textfield"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <TextField
        required
        key="last_name"
        label="Last Name"
        variant="outlined"
        className="auth-textfield"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <TextField
        required
        key="street_name"
        label="Street Name"
        variant="outlined"
        className="auth-textfield"
        value={streetName}
        onChange={(e) => setStreetName(e.target.value)}
      />
      <TextField
        required
        key="street_number"
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
        key="city"
        label="City"
        variant="outlined"
        className="auth-textfield"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <TextField
        required
        key="zipcode"
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
        key="cellno"
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
        key="birthdate"
        label="birthdate"
        value={birthDate}
        onChange={(newValue) => setBirthDate(newValue)}
      />
      <FormControlLabel
        key="ismember"
        control={
          <Checkbox
            checked={isMember}
            onChange={(e) => setIsMember(e.target.checked)}
          />
        }
        label="Are you a member?"
      />
      <FormControlLabel
        key="isstudent"
        control={
          <Checkbox
            checked={isStudent}
            onChange={(e) => setIsStudent(e.target.checked)}
          />
        }
        label="Are you a student?"
      />
      <div className="step-buttons-container" key="next-button">
        <Button variant="contained" color="primary" onClick={handleNext}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default SignUpForm;
