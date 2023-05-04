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
import { setUser } from "../../redux/userInfoSlice";



import Header from "../../components/Header";
import { Divider } from "@mui/material";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CreateNewGroup from "../../components/CreateNewGroup";
import { getUserProfile } from "../../utils/api";



const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector((state) => state.auth.accessToken);
  const roleId = useSelector((state) => state.auth.roleId);
  const user = useSelector((state) => state.user)
  // console.log("user data")
  // console.log(user);
  const [userProfileInfo, setuserProfileInfo] = useState("");
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userProfileResponse = await getUserProfile(accessToken, 2);
        setuserProfileInfo(userProfileResponse);
      } catch (error) {
        alert(error.response.data.message);
      }
    };

    fetchUserProfile()
    //   .then(()=>{
    //   console.log(userProfileInfo)
    // });

  },[accessToken, user]);


  
  
  return (
    <>
    <div>
            <Header/>
    </div>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} sx={{paddingTop: "50px", paddingBottom: "50px" }}>
          <Grid item xs={2}></Grid>
          <Grid item xs={8} sx={{ boxShadow: 3, paddingBottom: "20px" ,paddingRight:"20px"}}>
            <CreateNewGroup/>
          </Grid>
          <Grid item xs={2}></Grid>
      </Grid>    
    </Box>

    
    </>
  );
};

export default UserProfile;
