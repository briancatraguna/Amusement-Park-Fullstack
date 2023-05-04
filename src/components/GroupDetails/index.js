import React, { useEffect, useState } from "react";
import "./style.css";

import { loginUser, registerUser } from "../../utils/api";
import { useDispatch, useSelector } from "react-redux";
import {
  setAccessTokenState,
  setRoleId,
} from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { ROLE_TO_ID, ROUTES } from "../../utils/enums";



import { Fab } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import CreateNewGroup from "../CreateNewGroup";




  const renderTree = (nodes) => (
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

  },[groupData]);

  const handleButtonCreateNewGroup = () => {
    console.log("inside handleButtonCreateNewGroup");
    navigate(ROUTES.groupModification);
  }
  
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
