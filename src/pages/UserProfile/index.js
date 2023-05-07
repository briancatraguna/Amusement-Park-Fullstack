import React, { useEffect, useState } from "react";
import "./style.css";

import { loginUser, registerUser } from "../../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { setAccessTokenState, setRoleId } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { ROLE_TO_ID, ROUTES } from "../../utils/enums";
import { setUser } from "../../redux/userInfoSlice";

import Header from "../../components/Header";
import { Divider } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import GroupDetails from "../../components/GroupDetails";
import UserDetails from "../../components/UserDetails";
import { getUserProfile } from "../../utils/api";
import { emitNotification } from "../../utils/emitNotification";

const UserProfile = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const accessToken = useSelector((state) => state.auth.accessToken);
	const roleId = useSelector((state) => state.auth.roleId);
	const user = useSelector((state) => state.userInfo.user);
	// console.log("user data")
	// console.log(user);
	const [userProfileInfo, setuserProfileInfo] = useState("");
	useEffect(() => {
		const fetchUserProfile = async () => {
			try {
				//change this later
				const userProfileResponse = await getUserProfile(
					accessToken,
					user.user_id
				);
				setuserProfileInfo(userProfileResponse);
			} catch (error) {
				emitNotification("error", error.response.data.message);
			}
		};

		fetchUserProfile();
		//   .then(()=>{
		//   console.log(userProfileInfo)
		// });
	}, [accessToken, user]);

	return (
		<>
			<div>
				<Header />
			</div>
			<Box sx={{ flexGrow: 1 }}>
				<Grid container spacing={2}>
					<Grid item xs={6}>
						{userProfileInfo !== undefined &&
							userProfileInfo.data !== undefined &&
							userProfileInfo.data.userInfo !== undefined &&
							userProfileInfo.data.userInfo !== null && (
								<UserDetails
									userInfo={userProfileInfo.data.userInfo}
								/>
							)}
					</Grid>
					<Divider
						sx={{ boxShadow: 5, border: 1, marginTop: "30px" }}
						orientation="vertical"
						variant="middle"
						flexItem
					/>
					<Grid item xs={5}>
						{userProfileInfo !== undefined &&
							userProfileInfo.data !== undefined &&
							userProfileInfo.data.newGroupData !== undefined &&
							userProfileInfo.data.newGroupData !== null && (
								<GroupDetails
									groupData={
										userProfileInfo.data.newGroupData
									}
								/>
							)}
					</Grid>
				</Grid>
			</Box>
		</>
	);
};

export default UserProfile;
