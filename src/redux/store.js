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
      groups: JSON.parse(localStorage.getItem("groups")),
    },
    cart: {
      entryTickets: [],
      showTickets: [],
      storeOrder: [],
      totalInvoiceAmount: 0.0,
      totalUnpaidInvoiceAmount: 0.0,
    },
  },
});

store.subscribe(() => {
  const { accessToken, roleId } = store.getState().auth;
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("roleId", roleId);

  const { user, groups } = store.getState().userInfo;
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("groups", JSON.stringify(groups));
});

export default store;
