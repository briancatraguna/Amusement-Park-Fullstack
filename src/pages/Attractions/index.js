import React from "react";
import { useSelector } from "react-redux";
import Header from "../../components/Header";

const AttractionsPage = () => {
    const accessTokenState = useSelector((state) => state.auth.accessToken);
    return (
        <div>
            <Header/>
        </div>
    )
}

export default AttractionsPage;