import React from "react";
import { useSelector } from "react-redux";
import './style.css'

const EmployeeHomePage = () => {
    const accessToken = useSelector((state) => state.token.accessToken);

    return (
        <div>
            <h1>{accessToken}</h1>
            
        </div>
    )
}

export default EmployeeHomePage;