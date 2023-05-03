import { Snackbar } from "@mui/base";
import { Alert } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import { setShouldOpenLoginSnackbar } from "../../redux/authSlice";
import { ROUTES } from "../../utils/enums";
import "./style.css";

const HomePage = () => {
  const shouldOpenLoginSnackbar = useSelector(
    (state) => state.auth.shouldOpenLoginSnackbar
  );
  const dispatch = useDispatch();

  return (
    <div className="background">
      <Header />
      <Snackbar
        open={shouldOpenLoginSnackbar}
        autoHideDuration={2000}
        onClose={() => dispatch(setShouldOpenLoginSnackbar(false))}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Alert
          onClose={() => dispatch(setShouldOpenLoginSnackbar(false))}
          severity="success"
        >
          Login successful!
        </Alert>
      </Snackbar>
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
        <div className="menu-container">
          <Link to={ROUTES.attractions}>
            <div className="menu-item">
              <img
                src={require("../../assets/attractions-image.jpeg")}
                alt="attractions"
                className="rounded"
              />
              <p>Attractions</p>
            </div>
          </Link>
          <Link to={ROUTES.shows}>
            <div className="menu-item">
              <img
                src={require("../../assets/shows-image.jpeg")}
                alt="shows"
                className="rounded"
              />
              <p>Shows</p>
            </div>
          </Link>
          <Link to={ROUTES.stores}>
            <div className="menu-item">
              <img
                src={require("../../assets/stores-image.avif")}
                alt="stores"
                className="rounded"
              />
              <p>Stores</p>
            </div>
          </Link>
          <Link to={ROUTES.tickets}>
            <div className="menu-item">
              <img
                src={require("../../assets/tickets-image.jpeg")}
                alt="tickets"
                className="rounded"
              />
              <p>Tickets</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
