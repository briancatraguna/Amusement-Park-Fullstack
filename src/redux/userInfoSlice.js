import { createSlice } from "@reduxjs/toolkit";

export const userInfoSlice = createSlice({
    name: "userInfo",
    initialState: {
        user: null
    },
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
        },
        clearUserState(state) {
            localStorage.clear();
            state.user = null;
        }
    }
});

export const {setUser, clearUserState} = userInfoSlice.actions;
export default userInfoSlice.reducer;