import React, { useEffect, useState } from "react";
import "./style.css";

import PersonIcon from '@mui/icons-material/Person';
import { saveGroupsDataAPI } from "../../utils/api";
import { useDispatch, useSelector } from "react-redux";
import {
  setAccessTokenState,
  setRoleId,
} from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { ROLE_TO_ID, ROUTES } from "../../utils/enums";
import { setUser } from "../../redux/userInfoSlice";


import { Box , TextField, Checkbox, FormControlLabel, FormGroup, List,
        ListItemIcon, ListItemText ,Grid   } from "@mui/material";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import GroupIcon from '@mui/icons-material/Group';



const CreateNewGroup = () => {
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector((state) => state.auth.accessToken);
  const user = useSelector((state) => state.userInfo.user)
  // const roleId = useSelector((state) => state.auth.roleId);
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [steps , setSteps] = React.useState(['Add Group Details', 'Add member details', 'View Final Group details']);
  const [groupName , setGroupName] = React.useState("")
  const [inputList, setInputList] = useState([{ firstName: "", 
                                              lastName: "",
                                              email:"" ,
                                              mobileNo : "",
                                              dateofBirth: "",
                                              streetNo: "",
                                              streetName: "",
                                              city:"",
                                              zipCode: "",
                                              isStudent:"0",
                                              isMember:"0"}]);



  const isStepSkipped = (step) => {
    return skipped.has(step);
  };
  
  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setGroupName("");
    setInputList([{ firstName: "", 
                    lastName: "",
                    email:"" ,
                    mobileNo : "",
                    dateofBirth: "",
                    streetNo: "",
                    streetName: "",
                    city:"",
                    zipCode: "",
                    isStudent:"0",
                    isMember:"0"}]);
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    
    const list = [...inputList];
    list[index][name] = value;
    if(name === "isMember" || name === "isStudent" ){
      list[index][name] = e.target.checked?"1":"0"
      console.log(list[index][name])
    }
    setInputList(list);
  };

  const handleRemoveClick = index => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  const handleAddClick = () => {
    setInputList([...inputList, { firstName: "", 
                                  lastName: "",
                                  email:"" ,
                                  mobileNo : "",
                                  dateofBirth: "",
                                  streetNo: "",
                                  streetName: "",
                                  city:"",
                                  zipCode: "",
                                  isStudent:"0",
                                  isMember:"0"}]);
  };

  const handleUserProfileonClick = () =>{
    navigate(ROUTES.userProfile)
  }
  const createGroupsDataObject =() =>{
    return {
      visitorsData : inputList,
      groupData : {
        groupName,
        //change this later
        userId : user.user_id
      }
    }
  }
  const handleSave = async () =>{
    
    try {
      //change this later
        let groupsData = createGroupsDataObject()
        await saveGroupsDataAPI(accessToken, groupsData);
     } catch (error) {
       alert(error.response.data.message);
     }finally{
      handleNext();
     }
  }

  useEffect(() => {
    handleReset()
  },[]);

  
  return (
    <>            
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
        </Stepper> 
        <React.Fragment>
        {
          activeStep === steps.length  && (
            <>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - Group details are saved.
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleUserProfileonClick}>User Profile</Button>
            </Box>
            </>
          ) 
        }        
        { 
            activeStep === 0 &&(
              <>
              <Typography sx={{ mt: 2, mb: 1  }}>Step 1 : Enter Group Name</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 , justifyContent:"center" }}>
                <TextField
                    fullWidth
                    sx={{marginLeft : "50px" , marginRight: "50px"}}
                    label="Group Name"
                    variant="outlined"
                    className="auth-textfield"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                  />
              </Box>                
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 , paddingTop : '50px' }}>
                <Button
                  color="primary"
                  onClick={handleUserProfileonClick}
                  sx={{ mr: 1 }}
                >
                  User Profile
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button onClick={handleNext}
                  disabled = {groupName === ""}
                  >
                  {activeStep === steps.length - 1 ? 'Save' : 'Next'}
                </Button>
              </Box>
              </>
            )
            
          }
          { 
            activeStep > 0 && activeStep < steps.length-1 &&

           
            <>
              <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1} : Add Member Details</Typography>
              {inputList.map((x, i) => {

                return (
                  <>

              <Box sx={{ display: 'flex', flexDirection: 'column', pt: 2 , justifyContent:"center", alignItems:'center' }}>
              <div style={{flexDirection : "row"}}>
                    <TextField 
                        // disabled={disablefirstName}
                        label="First Name"
                        variant="outlined"
                        sx={{ m: 1 }}
                        className="textfield-1"
                        name="firstName"
                        value={x.firstName}
                        onChange={e => handleInputChange(e, i)}
                        />
                    
                    <TextField 
                        // disabled={disablefirstName}
                        label="Last Name"
                        variant="outlined"
                        sx={{ m: 1 }}
                        className="textfield-1"
                        name="lastName"
                        value={x.lastName}
                        onChange={e => handleInputChange(e, i)}
                        />
                  </div>
                  <div style={{flexDirection : "row"}}>
                    
                      <TextField
                        // disabled = {disableEmail}
                        fullWidth
                        label="Email"
                        variant="outlined"
                        className="textfield-1"
                        sx={{ m: 1 }}
                        name="email"
                        value={x.email}
                        onChange={e => handleInputChange(e, i)}
                        />
                  </div>
               <div style={{flexDirection : "row"}}>
                <TextField
                        // disabled = {disableMobileNo}                      
                        label="Mobile no"
                        variant="outlined"
                        className="textfield-1"
                        sx={{ m: 1 }}
                        name="mobileNo"
                        value={x.mobileNo}
                        onChange={e => handleInputChange(e, i)}
                        />
                  <TextField
                        // disabled = {disableDateofBirth}  
                        type="date"                    
                        label="Date of Birth (YYYY-MM-DD)"
                        variant="outlined"
                        className="textfield-1"
                        sx={{ m: 1 }}
                        name="dateofBirth"
                        value={x.dateofBirth}
                        onChange={e => handleInputChange(e, i)}
                        />
                </div>
                <div style={{flexDirection : "row"}}>
                <TextField
                        // disabled={disableStreetNo}
                        type="number"
                        label="Street No."
                        variant="outlined"
                        className="textfield-1"
                        sx={{ m: 1 }}
                        name="streetNo"
                        value={x.streetNo}
                        onChange={e => handleInputChange(e, i)}
                        />
                <TextField
                      // disabled={disableStreetName}
                      label="Street Name"
                      variant="outlined"
                      className="textfield-1"
                      sx={{ m: 1 }}
                      name="streetName"
                      value={x.streetName}
                      onChange={e => handleInputChange(e, i)}
                      />
                </div>
                <div style={{flexDirection : "row"}}>
                <TextField
                        // disabled = {disableCity}
                        label="City"
                        variant="outlined"
                        className="textfield-1"
                        sx={{ m: 1 }}
                        name="city"
                        value={x.city}
                        onChange={e => handleInputChange(e, i)}
                        />
                <TextField
                      // disabled={disableZipCode}
                      label="Zip Code"
                      variant="outlined"
                      className="textfield-1"
                      sx={{ m: 1 }}
                      name="zipCode"
                      value={x.zipCode}
                      onChange={e => handleInputChange(e, i)}
                      />
                </div>
                  <FormGroup style={{ display: "flex" , justifyContent: "center",
                                          alignItems: "center",flexDirection : "row" }}>

                    <FormControlLabel 
                    // disabled={disableIsStudent} 
                      control={
                        <Checkbox 
                          name="isStudent"
                          checked={x.isStudent==0?false:true} 
                          onChange={e => handleInputChange(e, i)}
                          />
                        } 
                      label="Student" />

                    <FormControlLabel 
                    // disabled={disableIsMember} 
                        control={
                          <Checkbox 
                          name="isMember"
                          checked={x.isMember==0?false:true} 
                          onChange={e => handleInputChange(e, i)}
                          />                          
                          } 
                        label="Member" />
                    
                  </FormGroup> 
                  <div style={{ display: "flex" , justifyContent: "center",
                                          alignItems: "center",flexDirection : "row" }}
                      >
                        <Button variant="contained" 
                        onClick={handleAddClick}
                        >
                            Add new member 
                        </Button>
                        <div className="divider"/>
                        <Button variant="contained" color="error"
                          onClick={ () => handleRemoveClick(i) }
                        >
                            Delete member 
                        </Button> 


                  </div> 
                </Box>
                </>
                )
              })}
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button 
                  // disabled={{checkDisableForNextOfAddMembers}}
                onClick={handleNext}>
                  Next
                </Button>
              </Box>
              </>
          }
          { 
            activeStep === steps.length-1 &&
            <>
            <Typography sx={{ mt: 2, mb: 1, pt:4 }}>Step {activeStep + 1}: Confirm Details</Typography>
              <Grid container  sx={{ display: 'flex', flexDirection: 'row', pt: 2 , alignItems:'center' ,justifyItems:'center'}}>
                <Grid item  xs={3}></Grid>
                <Grid item  xs={6}>
                <List
                      sx={{ width: '100%', bgcolor: 'background.paper' }}   >
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2  }}>
                      <ListItemIcon>
                          <GroupIcon />
                      </ListItemIcon>
                      <ListItemText primary={"GroupName : " + groupName} />
                    </Box>
                  <List component="div" sx={{ pl: 4, pt : 2 }} subheader="Members">
                  {
                    inputList.map((x, i) => {
                      return (
                      <>
                      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <ListItemIcon>
                            <PersonIcon />
                        </ListItemIcon>    
                        <ListItemText primary={ x.firstName + " " + x.lastName }/>
                      </Box>  
                      
                      
                      </>)
                    })
                  }
                  </List> 
                </List>                  
                </Grid>
                <Grid item  xs={3}></Grid>
              </Grid>
                

              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Button onClick={handleReset}>Reset</Button>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button onClick={handleSave}>
                  Save
                </Button>
              </Box>
              </>
          }
          
        </React.Fragment>             
    </>
  );
};

export default CreateNewGroup;
