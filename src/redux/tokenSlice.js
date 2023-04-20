import { createSlice } from "@reduxjs/toolkit";

export const tokenSlice = createSlice({
    name: "accessToken",
    initialState: {
        accessToken: null,
        isEmployee: false
    },
    reducers: {
        setAccessToken(state, action) {
            state.accessToken = action.payload
        },
        setIsEmployeeState(state, action) {
            state.isEmployee = action.payload
        }
    }
});

export const {setAccessToken, setIsEmployeeState} = tokenSlice.actions;
export default tokenSlice.reducer;