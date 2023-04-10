import React from "react";
import { useState } from "react";

const Authentication = (props) => {
    let [isLoginMode, setLoginMode] = useState(props.isLoginMode);

    let text = "Is signing up"
    if (isLoginMode) {
        text = "Is logging in"
    }

    const handleClick = () => {
        setLoginMode(!isLoginMode)
    }

    return (
        <div>
            <h1>{text}</h1>
            <button onClick={handleClick}>{text}</button>
        </div>
    )
}

export default Authentication;