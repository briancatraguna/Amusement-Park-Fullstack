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
      tickets: localStorage.getItem("tickets") === "null" ? [] : JSON.parse(localStorage.getItem("tickets")),
      parking: localStorage.getItem("parking") === "null" ? [] : JSON.parse(localStorage.getItem("parking")),
      storeOrder: localStorage.getItem("storeOrder") === "null" ? [] : JSON.parse(localStorage.getItem("storeOrder")),
    },
  },
});

store.subscribe(() => {
  const { accessToken, roleId } = store.getState().auth;
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("roleId", roleId);

  const { user } = store.getState().userInfo;
  localStorage.setItem("user", JSON.stringify(user));

  const { tickets, parking, storeOrder } = store.getState().cart;
  localStorage.setItem("tickets", JSON.stringify(tickets));
  localStorage.setItem("parking", JSON.stringify(parking));
  localStorage.setItem("storeOrder", JSON.stringify(storeOrder));
});

export default store;
