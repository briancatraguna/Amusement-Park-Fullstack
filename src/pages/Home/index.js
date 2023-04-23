import React from "react";
import { useSelector } from "react-redux";
import Header from "../../components/Header";
import "./style.css";

const HomePage = () => {
  const accessTokenState = useSelector((state) => state.auth.accessToken);

  return (
    <div>
      <Header />
      <h1>{accessTokenState}</h1>
    </div>
  );
};

export default HomePage;
