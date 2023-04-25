import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "../../components/Header";
import { getAttractions, getLotSections } from "../../utils/api";

const AttractionsPage = () => {
    const accessToken= useSelector((state) => state.auth.accessToken);

    const [attractionLots, setAttractionLots] = useState([]);
    const [attractions, setAttractions] = useState([]);

    useEffect(() => {
        const fetchAttractions = async() => {
            try {
                const attrResponse = await getAttractions(accessToken, null);
                setAttractions(attrResponse.data.attractions);
                const lotResponse = await getLotSections(accessToken);
                setAttractionLots(lotResponse.data.lotSections);
            } catch (error) {
                alert(error.response.data.message);
            }
        };
        fetchAttractions();
    },accessToken);
    
    
    return (
        <div>
            <Header/>
        </div>
    )
}

export default AttractionsPage;