import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import React, { useState } from "react";
import VoaLogo from "../../components/voalogo";
import './style.css'

const AuthenticationPage = (props) => {

    const [isLoginMode, setLoginMode] = useState(true);

    const LoginForm = () => {
        return (
            <div className="form-container">
                <h3>Sign In</h3>
                <TextField label="Email" variant="outlined" className="auth-textfield" />
                <TextField label="Password" variant="outlined" type="password" className="auth-textfield" />
                <Button variant="contained">Sign In</Button>
                <span className="signup-link">Don't have an account? <a onClick={() => setLoginMode(false)}>Sign up</a></span>
            </div>
        )
    }

    const SignUpForm = () => {
        const [checked, setChecked] = useState(false);

        const handleCheckboxChange = (event) => {
            setChecked(event.target.checked);
        };

        return (
            <div className="form-container">
                <h3>Account Registration</h3>
                <TextField label="User ID" variant="outlined" className="auth-textfield" />
                <TextField label="Email" variant="outlined" className="auth-textfield" />
                <TextField label="Password" variant="outlined" type="password" className="auth-textfield" />
                <FormControlLabel
                    control={<Checkbox checked={checked} onChange={handleCheckboxChange} />}
                    label="Are you an employee?"
                />
                <Button variant="contained" onClick={() => setLoginMode(true)}>Register</Button>
            </div>
        )
    }

    return (
        <div className="auth-container">
            <div className="left-side">

                <div className="logo-container">
                    <VoaLogo className="logo-top"/>
                </div>
                
                {isLoginMode ? <LoginForm/> : <SignUpForm/>}

            </div>

            <div className="right-side">
                <img 
                src={require('./../../assets/theme-park-image.jpeg')}
                className="auth-image"
                />
            </div>

        </div>
    )
}

export default AuthenticationPage;