import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import userInfoReducer from "./userInfoSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    userInfo: userInfoReducer,
  },
  preloadedState: {
    auth: {
      accessToken: localStorage.getItem("accessToken"),
      roleId: localStorage.getItem("roleId"),
    },
    userInfo: {
      user: (() => {
        try {
          return JSON.parse(localStorage.getItem("user"));
        } catch (error) {
          return null;
        }
      })(),
    },
  },
});

store.subscribe(() => {
  const { accessToken, roleId } = store.getState().auth;
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("roleId", roleId);

  const { user } = store.getState().userInfo;
  localStorage.setItem("user", user);
});

export default store;
