import React, { useState } from "react";
import "./style.css";
import {
  Step,
  StepLabel,
  Stepper,
} from "@mui/material";
import VisitorDataForm from "../VisitorDataForm";
import UserDataForm from "../UserDataForm";
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

  const getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return <VisitorDataForm handleNext={handleNext} />;
      case 1:
        return <UserDataForm handleBack={handleBack} handleRegister={handleRegister}/>;
      default:
        return null;
    }
  };

  const handleRegister = (userName, email, password) => {
    console.log("Test");
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
      roleId: 3
    })
  }

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
