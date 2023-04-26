import React from "react";
import { useSelector } from "react-redux";
import Header from "../../components/Header";
import './style.css'

const EmployeeHomePage = () => {
    const accessTokenState = useSelector((state) => state.auth.accessToken);
    const userState = useSelector((state) => state.userInfo.user);

    return (
        <div>
            <Header/>
            <h1>{accessTokenState}</h1>

        </div>
    )
}

export default EmployeeHomePage;