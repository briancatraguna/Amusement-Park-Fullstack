import { createSlice } from "@reduxjs/toolkit";

export const userInfoSlice = createSlice({
    name: "userInfo",
    initialState: {
        user: null,
        groups: []
    },
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
        },
        setGroups(state, action) {
            state.groups = action.payload
        },
        clearUserState(state) {
            localStorage.clear();
            state.user = null;
            state.groups = [];
        }
    }
});

export const {setUser, setGroups, clearUserState} = userInfoSlice.actions;
export default userInfoSlice.reducer;