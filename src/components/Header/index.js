import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import '../../App.css'
import { clearAuthState } from "../../redux/authSlice";
import { clearUserState } from "../../redux/userInfoSlice";
import { ROUTES } from "../../utils/enums";
import VoaLogo from "../voalogo";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessTokenState = useSelector((state) => state.auth.accessToken);

  useEffect(() => {
    if (accessTokenState == null) {
      navigate(ROUTES.auth);
    }
  })

  const handleLogout = () => {
    dispatch(clearAuthState());
    dispatch(clearUserState());
  }

  return (
    <header>
      <nav>
        <ul>
          <li>
            <VoaLogo/>
          </li>
          <li>
            <Link to={ROUTES.attractions}>Attractions</Link>
          </li>
          <li>
            <Link to={ROUTES.shows}>Shows</Link>
          </li>
          <li>
            <Link to={ROUTES.stores}>Stores</Link>
          </li>
          <li>
            <Link to={ROUTES.tickets}>Tickets</Link>
          </li>
          <li>
            <Link to={ROUTES.orders}>Orders</Link>
          </li>
        </ul>
        <h3>
          <Link to ={ROUTES.userProfile}></Link>
        </h3>
        <Button onClick={handleLogout}>Logout</Button>
      </nav>
    </header>
  );
};

export default Header;