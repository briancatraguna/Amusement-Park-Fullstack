import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import userInfoReducer from "./userInfoSlice";
import cartReducer from "./cartSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    userInfo: userInfoReducer,
    cart: cartReducer,
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
  },
});

store.subscribe(() => {
  const { accessToken, roleId } = store.getState().auth;
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("roleId", roleId);

  const { user } = store.getState().userInfo;
  localStorage.setItem("user", JSON.stringify(user));
});

export default store;
