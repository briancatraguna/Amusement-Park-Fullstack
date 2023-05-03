import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: null,
    roleId: 0,
    shouldOpenLoginSnackbar: false
  },
  reducers: {
    setAccessTokenState(state, action) {
      state.accessToken = action.payload;
      state.shouldOpenLoginSnackbar = true;
    },
    setRoleId(state, action) {
      state.roleId = action.payload;
    },
    setShouldOpenLoginSnackbar(state, action) {
      state.shouldOpenLoginSnackbar = action.payload;
    },
    clearAuthState(state) {
      localStorage.clear();
      state.accessToken = null;
      state.roleId = 0;
    },
  },
});

export const {
  setAccessTokenState,
  setRoleId,
  setShouldOpenLoginSnackbar,
  clearAuthState,
} = authSlice.actions;
export default authSlice.reducer;
