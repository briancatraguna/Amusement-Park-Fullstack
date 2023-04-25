import { Button } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Header from "../../components/Header";
import { getAttractions } from "../../utils/api";

const AttractionsPage = () => {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [attractions, setAttractions] = useState([]);

  const fetchAttractions = async () => {
    try {
      const response = await getAttractions(accessToken);
      setAttractions(response.data.attractions);
      console.log(attractions);
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  fetchAttractions();

  return (
    <div>
      <Header />
    </div>
  );
};

export default AttractionsPage;
