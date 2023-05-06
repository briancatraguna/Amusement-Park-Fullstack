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
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CreateNewGroup from "../../components/CreateNewGroup";
import { getUserProfile } from "../../utils/api";
import { emitNotification } from "../../utils/emitNotification";



const UserProfile = () => {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const user = useSelector((state) => state.user)
  const [userProfileInfo, setuserProfileInfo] = useState("");
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userProfileResponse = await getUserProfile(accessToken, user.user_id);
        setuserProfileInfo(userProfileResponse);
      } catch (error) {
        emitNotification(error.response.data.message);
      }
    };

    fetchUserProfile()

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
