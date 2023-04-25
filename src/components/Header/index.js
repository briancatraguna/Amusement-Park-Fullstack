import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "../../App.css";
import "./style.css";
import { clearAuthState } from "../../redux/authSlice";
import { clearUserState } from "../../redux/userInfoSlice";
import { ROUTES } from "../../utils/enums";
import VoaLogo from "../voalogo";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessTokenState = useSelector((state) => state.auth.accessToken);
  const user = useSelector((state) => state.userInfo.user);

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
            <Button variant="outlined" onClick={handleLogout}>
              Logout
            </Button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
