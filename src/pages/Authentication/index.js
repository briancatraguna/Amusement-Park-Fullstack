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
import { emitNotification } from "../../utils/emitNotification";

const AuthenticationPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const accessTokenState = useSelector((state) => state.auth.accessToken);
	const roleId = useSelector((state) => state.auth.roleId);
	useEffect(() => {
		if (accessTokenState !== null && accessTokenState !== "null") {
			if (roleId === ROLE_TO_ID["Employee"]) {
				navigate(ROUTES.employee);
			} else {
				navigate(ROUTES.home);
			}
		}
	});

	const [isLoginMode, setLoginMode] = useState(true);

	const [loginEmail, setLoginEmail] = useState("");
	const [loginPassword, setLoginPassword] = useState("");

	const [userName, setUserName] = useState("");
	const [regEmail, setRegEmail] = useState("");
	const [regPassword, setRegPassword] = useState("");
	const [isEmployee, setIsEmployee] = useState("");

	const handleSignIn = async () => {
		try {
			const response = await loginUser(loginEmail, loginPassword);
			if (response.success) {
				const roleName = response.data.user.role_name;
				const roleId = ROLE_TO_ID[roleName];
				const accessToken = response.data.token;
				const user = response.data.user;
				dispatch(setAccessTokenState(accessToken));
				dispatch(setRoleId(roleId));
				dispatch(setUser(user));
				emitNotification("success", `Succesfully logged in!`);
			}
		} catch (error) {
			emitNotification("error", error.response.data.message);
		}
	};

	const handleRegister = async (registerBody) => {
		try {
			const response = await registerUser(registerBody);
			if (response.success) {
				emitNotification("success", response.message);
				setLoginMode(true);
			}
		} catch (error) {
			emitNotification("error", error.response.data.message);
		}
	};

	return (
		<div className="auth-container">
			<div className="left-side">
				<div className="logo-container">
					<VoaLogo className="logo-top" />
				</div>
				{isLoginMode ? (
					<LoginForm
						email={loginEmail}
						setEmail={setLoginEmail}
						password={loginPassword}
						setPassword={setLoginPassword}
						onSignIn={() => handleSignIn()}
						onClickSignUp={() => setLoginMode(false)}
					/>
				) : (
					<SignUpForm
						userName={userName}
						setUserName={setUserName}
						email={regEmail}
						setEmail={setRegEmail}
						password={regPassword}
						setPassword={setRegPassword}
						isEmployee={isEmployee}
						setIsEmployee={setIsEmployee}
						onRegister={(registerBody) => handleRegister(registerBody)}
						onBackToLogin={() => setLoginMode(true)}
					/>
				)}
				;
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

export default AuthenticationPage;
