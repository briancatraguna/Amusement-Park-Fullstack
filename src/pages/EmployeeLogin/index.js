import React, { useEffect, useState } from "react";
import VoaLogo from "../../components/voalogo";
import "./style.css";
import LoginForm from "../../components/LoginForm";
import SignUpForm from "../../components/SignUpForm";
import { loginUser, registerUser } from "../../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { setAccessTokenState, setRoleId } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { ROLE_TO_ID, ROUTES } from "../../utils/enums";
import { setUser } from "../../redux/userInfoSlice";
import { setEmployee } from "../../redux/employeeInfoSlice"
import { emitNotification } from "../../utils/emitNotification";

const EmployeeLogin = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const accessTokenState = useSelector((state) => state.auth.accessToken);
	const stateRoleId = useSelector((state) => state.auth.roleId);
	useEffect(() => {
		if (accessTokenState !== null && accessTokenState !== "null") {
			// if (roleId === ROLE_TO_ID["Employee"]) {
			// 	navigate(ROUTES.employee);
			// } else {
				navigate(ROUTES.searchUser);
			// }
		}
	});

	// const [isLoginMode, setLoginMode] = useState(true);

	const [loginEmail, setLoginEmail] = useState("");
	const [loginPassword, setLoginPassword] = useState("");

	// const [userName, setUserName] = useState("");
	// const [regEmail, setRegEmail] = useState("");
	// const [regPassword, setRegPassword] = useState("");
	// const [isEmployee, setIsEmployee] = useState("");

	const handleSignIn = async () => {
		try {
			const response = await loginUser(loginEmail, loginPassword);
			if (response.success) {
				const roleName = response.data.user.role_name;
				const roleId = ROLE_TO_ID[roleName];
				const accessToken = response.data.token;
				const user = response.data.user;
				const employee = {...user}
				if(roleId != 2 ){
					emitNotification("error", "User is not an employee");
					return; 
				}
				dispatch(setAccessTokenState(accessToken));
				dispatch(setRoleId(roleId));
				dispatch(setUser(user));
				dispatch(setEmployee(employee))
				
				emitNotification("success", `Succesfully logged in!`);
			}
		} catch (error) {
			emitNotification("error", error.response.data.message);
		}
	};


	const handleOnlineUserLogin = async () => {
		navigate(ROUTES.auth);
	}

	return (
		<div className="auth-container">
			<div className="left-side">
				<div className="logo-container">
					<VoaLogo className="logo-top" />
				</div>
				<LoginForm
						email={loginEmail}
						setEmail={setLoginEmail}
						password={loginPassword}
						setPassword={setLoginPassword}
						onSignIn={() => handleSignIn()}
						isEmployeeLogin={true}
						onOnlineUserLogin={(handleOnlineUserLogin)}

				/>
			</div>

			<div className="right-side">
				<img
					src={require("./../../assets/theme-park-image.jpeg")}
					className="auth-image"
					alt="theme park"
				/>
			</div>
		</div>
	);
};

export default EmployeeLogin;
