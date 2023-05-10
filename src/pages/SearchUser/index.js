import React, { useEffect, useState } from "react";
import "./style.css";

import { createNewUserByEmployee , getUserDataByEmail} from "../../utils/api";
import { useDispatch, useSelector } from "react-redux";
import {
  setAccessTokenState,
  setRoleId,
} from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { ROLE_TO_ID, ROUTES } from "../../utils/enums";
import { setUser } from "../../redux/userInfoSlice";
import { emitNotification } from "../../utils/emitNotification";
import { formatDate } from "../../utils/function_helper";




import Header from "../../components/Header";
import { TextField, Button, Dialog, DialogContent, DialogActions, DialogTitle,
          FormControlLabel , Checkbox    } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { getUsersDataForEmployee } from "../../utils/api";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';





const SearchUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector((state) => state.auth.accessToken);
  const roleId = useSelector((state) => state.auth.roleId);
  const user = useSelector((state) => state.userInfo.user)
  const [enteredUserEmail , setEnteredUserEmail ] = useState("");
  const [usersData , setUsersData ] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');


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


  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  // console.log("user data")
  // console.log(user);
  useEffect(() => {
    


  },[accessToken, user]);

  

  const getDataFromAPI = async (enteredUserEmail) =>{

    try {
      let data = {
        emailString : enteredUserEmail
      };
      
      let apiData = await getUsersDataForEmployee(accessToken, data);
      console.log(apiData.data.userData)
      setUsersData(apiData.data.userData)
    } catch (error) {
      console.log(error)
    }finally{
    };

  }
  const handleEmailChange = async (e) => {
    let newInput = e.target.value;
    await setEnteredUserEmail(newInput);
    if(newInput !== ""){
      await getDataFromAPI(newInput)
    }
    
  }

  const handleTableRowClick = async (user) => {
    try{

      let dataAPI = await getUserDataByEmail( accessToken , {email : user.email})
      console.log(dataAPI.data.user)
      dispatch(setAccessTokenState(dataAPI.data.token));
			dispatch(setUser(dataAPI.data.user));
			emitNotification("success", `User Selected for transaction`);
    } catch (error) {
      console.log(error)
    }finally{
    };
    
    // dispatch(setUser(user));
 
  }
  
  const handleCancel =  async () => {
      handleClose()
  }

  const saveUserDataToAPI = async () =>{
    let userDataBody = {
        //create user data from body
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
      userName: userName,
      roleId: 3
    }
    try {
			const response = await createNewUserByEmployee(accessToken , userDataBody);
			//implement user select logic
      console.log(response)
      await handleTableRowClick(userDataBody)
		} catch (error) {
			emitNotification("error", error.response.data.message);
		}finally{
      handleClose()
    }
  }
  const handleCreateUser =  async () => {
    if (
      !userName ||
      !email ||
      !firstName ||
      !lastName ||
      !streetName ||
      !streetNumber ||
      !city ||
      !zipcode ||
      !cellNo ||
      !birthDate
  ) {
      emitNotification("error","User data is not completed!")
  } else {
      await saveUserDataToAPI();
  }
}
   
  return (
    <>
    <div>
            <Header/>
    </div>
    <Box sx={{  flexGrow: 1 ,  }}>

      <Grid container spacing={1}>
        <Grid item xs={1}/>
        <Grid item xs={10}>
          <Grid container spacing={1}>
            <Grid item xs={8}>
              {/* search box */}
              <h4>Enter customer email to start customer transaction</h4>
              <TextField
                required
                fullWidth
                id="outlined-required"
                label="Enter Email"
                value={enteredUserEmail}
                placeholder="abc@example.com"
                onChange={(e)=>handleEmailChange(e)}
              />
            </Grid>
            <Grid item xs={4} sx={{pl : 2}} >
              {/* create new user button */}
              <h4>Or create new user if does not exists</h4>


              {/* {enteredUserEmail} */}

              <Button variant="contained"  color="success" 
                  sx={{mt:1}}
                  onClick={handleOpen}
                > New User</Button>

                {/* button for dialog */}

              <Dialog
                  open={open}
                  maxWidth="md"
                  fullWidth={true}
                  onClose={handleClose}
                  scroll={scroll}
                  aria-labelledby="scroll-dialog-title"
                  aria-describedby="scroll-dialog-description">

                <DialogTitle id="scroll-dialog-title">Enter User Details</DialogTitle>
                  
                <DialogContent dividers={scroll === 'paper'}>
                  
                  <div className="form-container">
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
                      key="street_name"
                      label="Street Name"
                      variant="outlined"
                      className="auth-textfield"
                      value={streetName}
                      onChange={(e) => setStreetName(e.target.value)}
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
                    <DatePicker fullWidth="true" maxWidth="md"
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
              </div>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCancel}>Cancel</Button>
                    <Button onClick={handleCreateUser}>Create User</Button>
                  </DialogActions>
                    
                </Dialog>


            </Grid> 
          </Grid>

              <TableContainer component={Paper} sx={{mt:2 , mb :2}}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>User ID</TableCell>
                      <TableCell>Username</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>First Name</TableCell>
                      <TableCell>Last Name</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody style={{cursor:"pointer"}}>
                    {
                      usersData!=null && usersData!= undefined &&  Array.isArray(usersData) && usersData.length > 0 ? 
                      usersData.map((user, index) => (
                        
                            <TableRow
                              key={user.user_id}
                              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                              onClick={()=>handleTableRowClick(usersData[index])}
                              >
                              <TableCell> {user.user_id} </TableCell>
                              <TableCell >{user.username}</TableCell>
                              <TableCell>{user.email}</TableCell>
                              <TableCell>{user.fname}</TableCell>
                              <TableCell>{user.lname}</TableCell>
                            </TableRow>
                        
                      )) : (
                        <div style={{textAlign:'center'}}>
                            <h4> No data to display here</h4>
                        </div>
                      
                      
                      )
                    }
                  </TableBody>  
                </Table>
              </TableContainer>

        </Grid>
        <Grid item xs={1}/>
      </Grid>
        
    </Box>

    
    </>
  );
};

export default SearchUser;
