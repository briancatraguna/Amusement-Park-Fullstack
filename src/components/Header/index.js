import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "../../App.css";
import "./style.css";
import { clearAuthState } from "../../redux/authSlice";
import { clearUserState } from "../../redux/userInfoSlice";
import { ROUTES } from "../../utils/enums";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessTokenState = useSelector((state) => state.auth.accessToken);
  const user = useSelector((state) => state.userInfo.user);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    if (accessTokenState == null) {
      navigate(ROUTES.auth);
    }
  });

  const handleLogout = () => {
    dispatch(clearAuthState());
    dispatch(clearUserState());
  };

  return (
    <header className="header-home">
      <nav>
        <ul>
          <li className="header-menu">
            <Link to={ROUTES.home}>Home</Link>
          </li>
          <li className="header-menu">
            <Link to={ROUTES.attractions}>Attractions</Link>
          </li>
          <li className="header-menu">
            <Link to={ROUTES.shows}>Shows</Link>
          </li>
          <li className="header-menu">
            <Link to={ROUTES.stores}>Stores</Link>
          </li>
          <li className="header-menu">
            <Link to={ROUTES.tickets}>Tickets</Link>
          </li>
          <li className="header-menu">
            <Link to={ROUTES.orders}>Orders</Link>
          </li>
          <li>
            <Link to={ROUTES.userProfile}>
              <h3 className="header-menu">{user ? user.username : ""}</h3>
            </Link>
          </li>
          <li>
            <Button variant="outlined" onClick={() => setShowDialog(true)}>
              Logout
            </Button>
            <Dialog open={showDialog} onClose={() => setShowDialog(false)}>
              <DialogTitle>Confirm Logout</DialogTitle>
              <DialogContent>
                <p>Are you sure you want to logout?</p>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setShowDialog(false)} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleLogout} color="primary">
                  Logout
                </Button>
              </DialogActions>
            </Dialog>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
