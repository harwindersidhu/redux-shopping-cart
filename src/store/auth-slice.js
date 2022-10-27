import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { isLoggedIn: false },
  reducers: {
    login(state) {
      //we can mutate the state using reduxjs/toolkit because of immer library
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
    }
  }
});

export const authActions = authSlice.actions;

export default authSlice;