import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "../../App.css";
import "./style.css";
import { clearAuthState } from "../../redux/authSlice";
import { clearUserState } from "../../redux/userInfoSlice";
import { ROUTES } from "../../utils/enums";
import AlertDialog from "../AlertDialog";
import { clearCartState } from "../../redux/cartSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessTokenState = useSelector((state) => state.auth.accessToken);
  const user = useSelector((state) => state.userInfo.user);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

  useEffect(() => {
    if (accessTokenState === "null" || accessTokenState === null) {
      navigate(ROUTES.auth);
    }
  }, [accessTokenState, navigate]);

  const handleLogout = () => {
    dispatch(clearAuthState());
    dispatch(clearUserState());
    dispatch(clearCartState());
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
            <Link to={ROUTES.cart}>Cart</Link>
          </li>
          <li>
            <Link to={ROUTES.userProfile}>
              <h3 className="header-menu">{user ? user.username : ""}</h3>
            </Link>
          </li>
          <li>
            <Button variant="outlined" onClick={() => setIsLogoutDialogOpen(true)}>
              Logout
            </Button>
            <AlertDialog
              isOpen={isLogoutDialogOpen}
              onCancel={() => setIsLogoutDialogOpen(false)}
              onConfirm={handleLogout}
              negativeButtonTitle="Cancel"
              positiveButtonTitle="Logout"
              dialogTitle="Confirm Logout"
              dialogContent="Are you sure you want to logout?"
            />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
