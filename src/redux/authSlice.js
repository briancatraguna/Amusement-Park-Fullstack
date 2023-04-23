import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        accessToken: null,
        roleId: 0
    },
    reducers: {
        setAccessTokenState(state, action) {
            localStorage.setItem('accessToken',action.payload);
            state.accessToken = action.payload
        },
        setRoleId(state, action) {
            localStorage.setItem('roleId',action.payload);
            state.roleId = action.payload;
        },
        clearAuthState(state) {
            localStorage.clear();
            state.accessToken = null;
            state.roleId = 0;
        }
    }
});

export const {setAccessTokenState, setRoleId, clearAuthState} = authSlice.actions;
export default authSlice.reducer;