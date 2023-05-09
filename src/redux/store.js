import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import userInfoReducer from "./userInfoSlice";
import employeeInfoReducer from  "./employeeInfoSlice"
import cartReducer from "./cartSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    userInfo: userInfoReducer,
    cart: cartReducer,
    employeeInfo : employeeInfoReducer
  },
  preloadedState: {
    auth: {
      accessToken: localStorage.getItem("accessToken"),
      roleId: localStorage.getItem("roleId"),
    },
    userInfo: {
      user: JSON.parse(localStorage.getItem("user")),
    },
    cart: {
      tickets: [],
      parking: [],
      storeOrder: [],
    },
    employeeInfo: {
      employee: JSON.parse(localStorage.getItem("employee")),
    },
  },
});

store.subscribe(() => {
  const { accessToken, roleId } = store.getState().auth;
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("roleId", roleId);

  const { user } = store.getState().userInfo;
  localStorage.setItem("user", JSON.stringify(user));

  const { employee } = store.getState().employeeInfo;
  localStorage.setItem("employee", JSON.stringify(employee));
});

export default store;
