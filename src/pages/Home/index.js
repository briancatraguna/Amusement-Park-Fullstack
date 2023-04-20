import React from "react";
import { useSelector } from "react-redux";
import './style.css'

const HomePage = () => {
    const accessToken = useSelector((state) => state.token.accessToken);

    return (
        <h1>{accessToken}</h1>
    )
}

export default HomePage;