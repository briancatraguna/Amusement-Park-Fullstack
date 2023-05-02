import React, { useState } from "react";
import "./style.css";
import {
  Alert,
  Button,
  Snackbar,
  Step,
  StepLabel,
  Stepper,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { formatDate } from "../../utils/function_helper";
import VisitorDataForm from "../VisitorDataForm";

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
        return <VisitorDataForm handleNext={handleNext} />;
      case 1:
        return null;
      default:
        return null;
    }
  };

  const handleNext = (
    firstName,
    lastName,
    streetName,
    streetNumber,
    city,
    zipcode,
    cellNo,
    birthDate,
    isMember,
    isStudent
  ) => {
    setFirstName(firstName);
    setLastName(lastName);
    setStreetName(streetName);
    setStreetNumber(streetNumber);
    setCity(city);
    setZipcode(zipcode);
    setCellNo(cellNo);
    setBirthDate(birthDate);
    setIsMember(isMember);
    setIsStudent(isStudent);
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
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
    </div>
  );
};

export default SignUpForm;
