import { createSlice } from "@reduxjs/toolkit";

export const tokenSlice = createSlice({
    name: "accessToken",
    initialState: {
        accessToken: null,
        isEmployee: null
    },
    reducers: {
        setAccessToken(state, action) {
            state.accessToken = action.payload
        },
        setIsEmployee(state, action) {
            state.isEmployee = action.payload
        }
    }
});

export const {setAccessToken, setIsEmployee} = tokenSlice.actions;
export default tokenSlice.reducer;