import React, { useContext, useEffect, useState } from "react";
import "./style.css";

import PersonIcon from '@mui/icons-material/Person';
import { loginUser, registerUser } from "../../utils/api";
import { useDispatch, useSelector } from "react-redux";
import {
  setAccessTokenState,
  setRoleId,
} from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { ROLE_TO_ID, ROUTES } from "../../utils/enums";
import { setUser } from "../../redux/userInfoSlice";
import { saveUserProfileAPI } from "../../utils/api";



import { Button, Checkbox, FormControlLabel, TextField ,FormGroup,Divider, Fab } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import { emitNotification } from "../../utils/emitNotification";





const UserDetails = ({userInfo}) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector((state) => state.auth.accessToken);
  const roleId = useSelector((state) => state.auth.roleId);

  //fields
  const [userFullName, setUserFullName] = useState(userInfo.fname + " " +userInfo.lname);
  const [userName , setUserName] = useState(userInfo.username)
  const [email, setEmail] = useState(userInfo.user_email);
  const [streetNo , setStreetNo] = useState(userInfo.street_number);
  const [streetName , setStreetName] = useState(userInfo.street_name);
  const [city , setCity] = useState(userInfo.city);
  const [zipCode , setZipCode] = useState(userInfo.zip_code);
  const [mobileNo , setMobileNo] = useState(userInfo.cell_no);
  const [ dateofBirth, setDateofBirth] = useState(userInfo.birth_date);
  const [ isStudent, setIsStudent] = useState(userInfo.is_student);
  const [ isMember, setIsMember] = useState(userInfo.is_member);


  //diable fields
  const [disableUsername,     setDisableUsername ] = useState(true);
  const [disableEmail,        setDisableEmail ] = useState(true);
  const [disableMobileNo,     setDisableMobileNo ] = useState(true);
  const [disableStreetNo,     setDisableStreetNo ] = useState(true);
  const [disableStreetName,   setDisableStreetName ] = useState(true);
  const [disableCity,         setDisableCity ] = useState(true);
  const [disableZipCode,      setDisableZipCode ] = useState(true);
  const [disableDateofBirth,  setDisableDateofBirth ] = useState(true);
  const [ disableIsStudent, setDisableIsStudent] = useState(true);
  const [ disableIsMember, setDisableIsMember] = useState(true);

  //diable buttons
  const [disableEditButton ,       setDisableEditButton] = useState(true);
  const [disableSaveCancelButton , setDisableSaveCancelButton] = useState(false);

  //backdrop
  const [open, setOpen] = React.useState(false);

  // const userInfo = useContext(userInfo)
  const setUserInfoFromProps = () =>{
      setUserFullName(userInfo.fname + " " +userInfo.lname)
      setUserName(userInfo.username)
      setEmail(userInfo.user_email);
      setStreetNo(userInfo.street_number)
      setStreetName(userInfo.street_name)
      setCity(userInfo.city)
      setZipCode(userInfo.zip_code)
      setMobileNo(userInfo.cell_no)
      setDateofBirth(userInfo.birth_date)
      setIsStudent(userInfo.is_student)
      setIsMember(userInfo.is_member)
  }

  //set userInfo from save response
  const setUserInfoFromSave = () => {
    userInfo.username = userName	
    userInfo.user_email = email
    userInfo.street_name =	streetName
    userInfo.street_number = streetNo
    userInfo.city = city		
    userInfo.zip_code = zipCode	
    userInfo.birth_date = dateofBirth	
    userInfo.cell_no = 	mobileNo	
    userInfo.is_member = isStudent	
    userInfo.is_student = 	isMember    
  }

  const setDisableFields = (field) => {
    setDisableUsername(field)
    setDisableEmail(field)
    setDisableMobileNo(field)
    setDisableStreetNo(field)
    setDisableStreetName(field)
    setDisableCity(field)
    setDisableZipCode(field)
    setDisableDateofBirth(field)
    setDisableIsStudent(field)
    setDisableIsMember(field)
  }

  //user object for save data
  const createUserDetailsObject = () => {
    console.log(userInfo);
    return  {
      userFullName	,
      userName 		,
      email			,
      streetNo 		,
      streetName 		,
      city 			,
      zipCode 		,
      mobileNo 		,
      dateofBirth		,
      isStudent		,
      isMember	,
      visitorId : userInfo.visitor_id,
      userId :userInfo.user_id
    }
  }

  useEffect(() => {
    
    if(userInfo!==undefined &&  userInfo!==null){
      setUserInfoFromProps()
    }
      

  },[userInfo]);

  //handle user edit button
  const editUserProfile = ()=>{
      setDisableSaveCancelButton(true);
      setDisableEditButton(false);

      setDisableFields(false)

  }

  //save user data by calling API
  const saveUserProfileToDB = async () => {
    try {
      let userDetailsObject = createUserDetailsObject();
      // const userProfileResponse = 
      await saveUserProfileAPI(accessToken, userDetailsObject);
      setUserInfoFromSave();
    } catch (error) {
      emitNotification("error", error.response.data.message);
    }finally{
      setUserInfoFromProps()
    };
  };

  //handle user save button
  const saveUserProfile = ()=>{
    setDisableSaveCancelButton(false);
    setDisableEditButton(true);
    //start spinner before calling API to save data
    setOpen(true);
    saveUserProfileToDB().then(res=>{
        
    }).finally(()=>{
      setTimeout(()=>{
        setOpen(false);
      },1000)
      
    })
    //call api to save fields
    //stop spinner
    setDisableFields(true)
  }

  //handle user cancel button
  const cancelUserProfile = ()=>{
    setOpen(true);
    setDisableSaveCancelButton(false);
    setDisableEditButton(true);

    setUserInfoFromProps();

    setDisableFields(true)
    setTimeout(()=>{
      setOpen(false);
    },1000)

  }

  

 
  
  return (
    userInfo!==undefined && <>
      <div className="form-container-1">
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
            // onClick={handleClose}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
          <h3>Hi, {userFullName}</h3>
              <div style={{flexDirection : "row"}}>
                <TextField 
                        disabled={disableUsername}
                        label="Username"
                        variant="outlined"
                        sx={{ m: 1 }}
                        className="textfield-1"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                      />
                    
                  <TextField
                    disabled = {disableEmail}
                    label="Email"
                    variant="outlined"
                    className="textfield-1"
                    sx={{ m: 1 }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

              </div>
              <div style={{flexDirection : "row"}}>
                <TextField
                        disabled = {disableMobileNo}                      
                        label="Mobile no"
                        variant="outlined"
                        className="textfield-1"
                        sx={{ m: 1 }}
                        value={mobileNo}
                        onChange={(e) => setMobileNo(e.target.value)}
                      />
                  <TextField
                         type="date"  
                        disabled = {disableDateofBirth}                      
                        label="Date of Birth (YYYY-MM-DD)"
                        variant="outlined"
                        className="textfield-1"
                        sx={{ m: 1 }}
                        value={dateofBirth}
                        onChange={(e) => setDateofBirth(e.target.value)}
                      />

              </div>
              

              <h4>Address</h4>
              <div style={{flexDirection : "row"}}>
                <TextField
                        type="number"
                        disabled={disableStreetNo}
                        label="Street No."
                        variant="outlined"
                        className="textfield-1"
                        sx={{ m: 1 }}
                        value={streetNo}
                        onChange={(e) => setStreetNo(e.target.value)}
                      />
                <TextField
                      disabled={disableStreetName}
                      label="Street Name"
                      variant="outlined"
                      className="textfield-1"
                      sx={{ m: 1 }}
                      value={streetName}
                      onChange={(e) => setStreetName(e.target.value)}
                    />
                
              </div>

              <div style={{flexDirection : "row"}}>
                <TextField
                        disabled = {disableCity}
                        label="City"
                        variant="outlined"
                        className="textfield-1"
                        sx={{ m: 1 }}
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      />
                <TextField
                      disabled={disableZipCode}
                      label="Zip Code"
                      variant="outlined"
                      className="textfield-1"
                      sx={{ m: 1 }}
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                    />
                
                  <FormGroup style={{ display: "flex" , justifyContent: "center",
                                          alignItems: "center",flexDirection : "row" }}>

                    <FormControlLabel disabled={disableIsStudent} 
                      control={
                        <Checkbox checked={isStudent==0?false:true} 
                          onClick={()=>setIsStudent(isStudent==0?"1":"0")}
                        />
                        } 
                      label="Student" />

                    <FormControlLabel disabled={disableIsMember} 
                        control={
                          <Checkbox checked={isMember==0?false:true} 
                          onClick={()=>setIsMember(isMember==0?"1":"0")}
                          />                          
                          } 
                        label="Member" />
                    
                  </FormGroup>  


                  <div style={{ display: "flex" , justifyContent: "center",
                                alignItems: "center",flexDirection : "row" 
                          }}>
                      {
                        disableEditButton &&  
                        <>
                          <Button variant="contained" 
                            onClick={editUserProfile}
                          >
                              Edit Details
                          </Button> 
                          <div className="divider"/>
                        </>                         
                      }
                      {
                        disableSaveCancelButton && 
                        <>
                        <Button variant="contained"  color="success"
                        onClick={saveUserProfile}
                        >
                            Save 
                        </Button> 
                        <div className="divider"/>
                        <Button variant="contained" color="error"
                          onClick={ cancelUserProfile }
                        >
                            Cancel 
                        </Button> 
                        </>
                      }
                      
                  </div>
                          
              </div>
               
            </div>

    
    </>
  );
};

export default UserDetails;
