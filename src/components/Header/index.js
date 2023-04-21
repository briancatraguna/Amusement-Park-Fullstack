import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import '../../App.css'
import { clearState } from "../../redux/tokenSlice";
import { ROUTES } from "../../routes";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessTokenState = useSelector((state) => state.token.accessToken);

  useEffect(() => {
    if (accessTokenState == null) {
      navigate(ROUTES.auth);
    }
  })

  const handleLogout = () => {
    console.log("Handle logout triggered");
    dispatch(clearState());
  }

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to={ROUTES.attractions}>Attractions</Link>
          </li>
          <li>
            <Link to={ROUTES.shows}>Shows</Link>
          </li>
          <li>
            <Link to={ROUTES.foodStalls}>Food Stalls</Link>
          </li>
          <li>
            <Link to={ROUTES.tickets}>Tickets</Link>
          </li>
          <li>
            <Link to={ROUTES.orders}>Orders</Link>
          </li>
        </ul>
        <Button onClick={handleLogout}>Logout</Button>
      </nav>
    </header>
  );
};

export default Header;