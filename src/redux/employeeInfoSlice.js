import { createSlice } from "@reduxjs/toolkit";

export const employeeInfoSlice = createSlice({
    name: "employeeInfo",
    initialState: {
        employee: null
    },
    reducers: {
        setEmployee(state, action) {
            state.employee = action.payload;
        },
        clearEmployeeState(state) {
            localStorage.clear();
            state.employee = null;
        }
    }
});

export const {setEmployee, clearEmployeeState} = employeeInfoSlice.actions;
export default employeeInfoSlice.reducer;