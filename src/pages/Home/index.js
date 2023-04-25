import React from "react";
import Header from "../../components/Header";
import "./style.css";

const HomePage = () => {
  return (
    <div>
      <Header />
      <div className="image-container">
        <img
          src={require("../../assets/theme-park-image-home.jpeg")}
          className="theme-park-image-home"
          alt="theme park"
        />
        <div className="text-container">
          <h1>Welcome to Voyage of Amusements!</h1>
          <p>Experience the thrill of the rides and the attractions.</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
