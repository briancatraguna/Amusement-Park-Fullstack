import React, { useEffect, useState } from "react";
import "./style.css";

import { addNewVisitorToGroup } from "../../utils/api";
import { useDispatch, useSelector } from "react-redux";
import {
  setAccessTokenState,
  setRoleId,
} from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { ROLE_TO_ID, ROUTES } from "../../utils/enums";



import { Fab } from "@mui/material";
import { TextField, Button, Dialog, DialogContent, DialogActions, DialogTitle,
  FormControlLabel , Checkbox    } from "@mui/material";
  import { DatePicker } from "@mui/x-date-pickers/DatePicker";
  import { formatDate } from "../../utils/function_helper";


import AddIcon from '@mui/icons-material/Add';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import CreateNewGroup from "../CreateNewGroup";
import { emitNotification } from "../../utils/emitNotification";





  


const GroupDetails = ({groupData}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector((state) => state.auth.accessToken);
  const roleId = useSelector((state) => state.auth.roleId);
  const [userGroupData , setUserGroupData ] = useState(groupData);
  const [selectedNode , setSelectedNode] = useState("");

  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState('paper');

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
  const [email, setEmail] = useState("");


  const handleClickOpen = () => {
    setOpen(true);
  };
    
  const handleClose = () => {
    setOpen(false);
  };

  const handleCancel =  async () => {
    handleClose()
  }
  const saveVisitorDataToAPI = async() => {
        let userDataBody = {
          //create user data from body
        groupId : selectedNode.id,
        firstName: firstName,
        lastName: lastName,
        streetName: streetName,
        streetNumber: streetNumber,
        city: city,
        zipcode: zipcode,
        cellNo: cellNo,
        birthDate: formatDate(birthDate).split(" ")[0],
        isMember: isMember?1:0,
        isStudent: isStudent?1:0,
        email: email,
        roleId: 3
      }
      try {
        // console.log(userDataBody);
        const response = await addNewVisitorToGroup(accessToken , userDataBody);
        //implement user select logic
        // console.log(response)
        //set new data to the data tree
        let newUserGroupData  = JSON.parse(JSON.stringify(userGroupData)); 
        newUserGroupData.forEach(group => {
          if(group.id == userDataBody.groupId ){
              group.children.push({
                id : group.id + " - " + response.data.data.visitorId,
                name : response.data.data.visitorName,
                visitor_id : response.data.data.visitorId
              })
          }
        })
        // console.log(newUserGroupData)
        setUserGroupData(newUserGroupData)
      } catch (error) {
        emitNotification("error", error.response.data.message);
      }finally{
        handleClose()
      }
  }

  const handleCreateUser =  async () => {
    if (
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
      await saveVisitorDataToAPI();
  }
}

  const handleClickGroup = async (node) =>{
    setSelectedNode(node)
    console.log(node)
    handleClickOpen();
  }

  useEffect(() => {
    
    setUserGroupData(groupData);

  },[groupData]);

  const handleButtonCreateNewGroup = () => {
    console.log("inside handleButtonCreateNewGroup");
    navigate(ROUTES.groupModification);
  }

  const renderTree = (nodes) => {
      
      return (
      <>
      <TreeItem key={nodes.id + " - 0"} nodeId={nodes.id + " - 0"} label={nodes.name}>
        {
          Array.isArray(nodes.children) && nodes.children.map((child) => (
            <>
            <TreeItem key={String(child.id)} nodeId={child.id} label={child.name}/>
            </>
          ))
        }
        {
          nodes.children!=undefined && nodes.children.length>0 &&
            <Fab variant="extended" color="primary" size="small"
            sx={{marginBottom: "10px"}}
            onClick={()=>handleClickGroup(nodes)}
              >
              <AddIcon sx={{ mr: 1 }} />
              New Member
          </Fab> 
        }
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
      </TreeItem>    
    </>
      
    )};
  
  return (
    <>
      <div className="form-container-1">
              
              <div style={{ display: "flex" , justifyContent: "center",
                                alignItems: "center",flexDirection : "row",
                                paddingBottom: "10px" ,paddingTop: "10px" 
                                          }}>
                    <Fab variant="extended" color="primary"
                          onClick={handleButtonCreateNewGroup}
                      >
                      <AddIcon sx={{ mr: 1 }} />
                      Create New Group
                    </Fab>                      
              </div>
                
                <h3>Your Groups</h3>
                <h5>(Click group name to view group members)</h5>
                <TreeView
                  aria-label="rich object"
                  defaultCollapseIcon={<ExpandMoreIcon />}
                  // defaultExpanded={['root']}
                  defaultExpandIcon={<ChevronRightIcon />}
                  sx={{ flexGrow: 1, maxWidth: 400 }}
                >
                  {userGroupData.map(item => renderTree(item) )}
                  
                </TreeView>
               
                

            </div>
    </>
  );
};

export default GroupDetails;
