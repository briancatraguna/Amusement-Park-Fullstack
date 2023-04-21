import React from "react";
import { useSelector } from "react-redux";
import './style.css'

const EmployeeHomePage = () => {
    const accessTokenState = useSelector((state) => state.token.accessToken);

    return (
        <div>
            <h1>{accessTokenState}</h1>

        </div>
    )
}

export default EmployeeHomePage;