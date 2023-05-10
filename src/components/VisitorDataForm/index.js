import {
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "./style.css";
import { emitNotification } from "../../utils/emitNotification";

const VisitorDataForm = ({ handleNext }) => {
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

  const validate = () => {
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
      emitNotification("error","Visitor data is not completed!");
    } else {
      handleNext(
        firstName,
        lastName,
        streetName,
        streetNumber,
        city,
        zipcode,
        cellNo,
        birthDate,
        isMember,
        isStudent,
      );
    }
  };

  return (
    <div>
      <TextField
        required
        key="first_name"
        label="First Name"
        variant="outlined"
        className="visitor-data-textfield"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <TextField
        required
        key="last_name"
        label="Last Name"
        variant="outlined"
        className="visitor-data-textfield"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <TextField
        required
        key="street_name"
        label="Street Name"
        variant="outlined"
        className="visitor-data-textfield"
        value={streetName}
        onChange={(e) => setStreetName(e.target.value)}
      />
      <TextField
        required
        key="street_number"
        label="Street Number"
        type="number"
        variant="outlined"
        className="visitor-data-textfield"
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
        className="visitor-data-textfield"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <TextField
        required
        key="zipcode"
        label="Zip Code"
        variant="outlined"
        className="visitor-data-textfield"
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
        className="visitor-data-textfield"
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
        <Button variant="contained" color="primary" onClick={validate}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default VisitorDataForm;
