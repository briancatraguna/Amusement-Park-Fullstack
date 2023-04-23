import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice';

const store = configureStore({
    reducer: {
        auth: authReducer
    },
    preloadedState: {
        auth: {
            accessToken: localStorage.getItem("accessToken"),
            roleId: localStorage.getItem("roleId")
        }
    }
});

store.subscribe(() => {
    const {accessToken, roleId} = store.getState().auth;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("roleId", roleId);
})

export default store;