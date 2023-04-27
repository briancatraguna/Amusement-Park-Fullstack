import React, { useEffect, useState } from "react";
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



import { Button, Checkbox, FormControlLabel, TextField ,FormGroup,Divider, Fab } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';



const data = [ {
  id: 'root',
  name: 'Parent',
  children: [
    {
      id: '1',
      name: 'Child - 1',
    },
    {
      id: '3',
      name: 'Child - 3',
    },
  ]} , {
    id: 'root-2',
    name: 'Parent-2',
    children: [
      {
        id: '5',
        name: 'Child - 5',
      },
      {
        id: '6',
        name: 'Child - 6',
      },
    ]}];



  const renderTree = (nodes) => (
    <>
    <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
      {
        Array.isArray(nodes.children) && nodes.children.map((child) => (
          <>
          <TreeItem key={child.id} nodeId={child.id} label={child.name}/>
          </>
        ))
      }
      {
        nodes.children!=undefined && nodes.children.length>0 &&
          <Fab variant="extended" color="primary" size="small"
          sx={{marginBottom: "10px"}}
          onClick={()=>console.log("clicked create new group")}
            >
            <AddIcon sx={{ mr: 1 }} />
            New Member
        </Fab> 
      }
    </TreeItem>
      
               
  </>
    
  );


const GroupDetails = ({groupData}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessTokenState = useSelector((state) => state.auth.accessToken);
  const roleId = useSelector((state) => state.auth.roleId);
  const [userGroupData , setUserGroupData ] = useState(groupData);

  useEffect(() => {
    
    setUserGroupData(groupData);
    console.log(userGroupData)

  },[groupData]);



  

  // const handleSignIn = async () => {
  //   try {
  //     const response = await loginUser(loginEmail, loginPassword);
  //     if (response.success) {
  //       const roleName =
  //         response.data.user.role_name;
  //       const roleId = ROLE_TO_ID[roleName];
  //       const accessToken = response.data.token;
  //       const user = response.data.user;
  //       dispatch(setAccessTokenState(accessToken));
  //       dispatch(setRoleId(roleId));
  //       dispatch(setUser(user));
  //       alert(`Succesfully logged in!`);
  //     }
  //   } catch (error) {
  //     alert(error.response.data.message);
  //   }
  // };

  // const handleRegister = async () => {
  //   try {
  //     const roleId = isEmployee ? ROLE_TO_ID["Employee"] : ROLE_TO_ID["Customer"];
  //     const response = await registerUser(
  //       regEmail,
  //       regPassword,
  //       userName,
  //       roleId
  //     );
  //     if (response.success) {
  //       alert(response.message);
  //       setLoginMode(true);
  //     }
  //   } catch (error) {
  //     alert(error.response.data.message);
  //   }
  // };
  
  return (
    <>
      <div className="form-container-1">
              
              <div style={{ display: "flex" , justifyContent: "center",
                                alignItems: "center",flexDirection : "row",
                                paddingBottom: "10px" ,paddingTop: "10px" 
                                          }}>
                      <Fab variant="extended" color="primary"
                        onClick={()=>console.log("clicked create new group")}
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
