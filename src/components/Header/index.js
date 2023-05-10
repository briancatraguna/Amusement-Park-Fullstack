import { Button, Grid, Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "../../App.css";
import "./style.css";
import { clearAuthState } from "../../redux/authSlice";
import { clearUserState } from "../../redux/userInfoSlice";
import { clearEmployeeState } from "../../redux/employeeInfoSlice";
import { ROUTES } from "../../utils/enums";
import AlertDialog from "../AlertDialog";
import { clearCartState, setTotalInvoiceAmount, setTotalUnpaidInvoiceAmount } from "../../redux/cartSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessTokenState = useSelector((state) => state.auth.accessToken);
  const user = useSelector((state) => state.userInfo.user);
  const employee = useSelector((state) => state.employeeInfo.employee);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const roleId = useSelector((state) => state.auth.roleId);

  useEffect(() => {
    if (accessTokenState === "null" || accessTokenState === null) {
      navigate(ROUTES.auth);
      console.log(employee)
      console.log(user)
    }
  }, [accessTokenState, navigate]);

  const handleLogout = () => {
    dispatch(clearAuthState());
    dispatch(clearUserState());
    dispatch(clearCartState());
    dispatch(clearEmployeeState());
    dispatch(setTotalInvoiceAmount(0.0));
    dispatch(setTotalUnpaidInvoiceAmount(0.0));
  };

  return (
    <>
    <header className="header-home">
      <nav>
        <ul>
          <li className="header-menu">
            <Link to={ROUTES.home}>Home</Link>
          </li>
          {
            (employee !== null && employee !== "null") && 
            <li className="header-menu">
            <Link to={ROUTES.searchUser}>Search Users</Link>
            </li>
          }
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
          <li className="header-menu">
            <Link to={ROUTES.invoices}>Orders</Link>
          </li>
          {  
            employee==null ? 
              (<li>
                <Link to={ROUTES.userProfile}>
                  <h3 className="header-menu">{employee !== null && employee !== "null" ? employee.username  :(user ? user.username : "")}</h3>
                </Link>
              </li>) :  <>
                {
                  (employee.user_id === user.user_id) &&
                    <li>
                      <Link to={ROUTES.userProfile}>
                        <h3 className="header-menu">{employee !== null && employee !== "null" ? employee.username  :(user ? user.username : "")}</h3>
                      </Link>
                    </li>
                }
              </>
          }
          <li>
            <Button variant="outlined" className="float-right" onClick={() => setIsLogoutDialogOpen(true)}>
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
    {
      roleId == 2 && employee!=null && user!=null &&
      employee.user_id != user.user_id  && 
      (
      <>
        <Divider />
        <Grid container 
          style={{backgroundColor : "#ffb347" , color: "#fff"}}
        >
          <Grid item xs={12} sx={{textAlign:'center'}}>
            <h3> Currenly doing transaction for  <Link to={ROUTES.userProfile}><u>{user.email}</u></Link> </h3>
          </Grid>
        </Grid>
      </>
      )
    } 
    
    </>
  );
};

export default Header;
