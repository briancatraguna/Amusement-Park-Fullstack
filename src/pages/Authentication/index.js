import React, { useState } from "react";
import VoaLogo from "../../components/VoaLogo";
import "./style.css";
import LoginForm from "../../components/LoginForm";
import SignUpForm from "../../components/SignUpForm";
import { loginUser, registerUser } from "../../utils/api";

const AuthenticationPage = (props) => {
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
        const isEmployee =
          response.data.user.is_ticketemployee === "1" ? true : false;
        alert(`Succesfully logged in!\n${isEmployee}`);
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const handleRegister = async () => {
    try {
      const response = await registerUser(
        regEmail,
        regPassword,
        userName,
        isEmployee
      );
      if (response.success) {
        alert(response.message);
        setLoginMode(true);
      }
    } catch (error) {
      alert(error.response.data.message);
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
            onRegister={() => handleRegister()}
            onBackToLogin={() => setLoginMode(true)}
          />
        )}
        ;
      </div>

      <div className="right-side">
        <img
          src={require("./../../assets/theme-park-image.jpeg")}
          className="auth-image"
        />
      </div>
    </div>
  );
};

export default AuthenticationPage;
