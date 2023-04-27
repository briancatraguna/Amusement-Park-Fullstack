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
import GroupDetails from "../../components/GroupDetails";
import UserDetails from "../../components/UserDetails";
import { getUserProfile } from "../../utils/api";



const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector((state) => state.auth.accessToken);
  const roleId = useSelector((state) => state.auth.roleId);
  const user = useSelector((state) => state.user)
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


  // const [userName, setUserName] = useState("");
  // const [email, setEmail] = useState("");
  // const [streetNo , setStreetNo] = useState("");
  // const [streetName , setStreetName] = useState("");
  // const [city , setCity] = useState("");
  // const [zipCode , setZipCode] = useState("");
  // const [mobileNo , setMobileNo] = useState("");

  

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
    <div>
            <Header/>
    </div>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          {
            userProfileInfo!==undefined && 
            userProfileInfo.data!==undefined &&
            userProfileInfo.data.userInfo!==undefined &&
            userProfileInfo.data.userInfo!==null && 
            <UserDetails userInfo={userProfileInfo.data.userInfo} /> 
          }
                       
        </Grid>
        <Divider sx={{ boxShadow: 5 , border: 1 , marginTop: "30px" }} orientation="vertical" variant="middle" flexItem />                             
        <Grid item xs={5}>
          {
            userProfileInfo!==undefined && 
            userProfileInfo.data!==undefined &&
            userProfileInfo.data.newGroupData!==undefined &&
            userProfileInfo.data.newGroupData!==null && 
            <GroupDetails groupData={userProfileInfo.data.newGroupData}/> 
          }
            
        </Grid>
      </Grid>
    </Box>

    
    </>
  );
};

export default UserProfile;
