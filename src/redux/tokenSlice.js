import { createSlice } from "@reduxjs/toolkit";

export const tokenSlice = createSlice({
    name: "accessToken",
    initialState: {
        accessToken: null,
        isEmployee: false
    },
    reducers: {
        setAccessTokenState(state, action) {
            state.accessToken = action.payload
        },
        setIsEmployeeState(state, action) {
            state.isEmployee = action.payload
        },
        clearState(state) {
            state.accessToken = null
            state.isEmployee = false
        }
    }
});

export const {setAccessTokenState, setIsEmployeeState, clearState} = tokenSlice.actions;
export default tokenSlice.reducer;