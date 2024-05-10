import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: false,
  token: "",
  userDetails:{}
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.loggedIn = true;
      state.token = action.payload.token;
      state.userDetails = action.payload.userDetails;
    },
    logout: (state) => {
      state.loggedIn = initialState.loggedIn;
      state.token = initialState.loggedIn;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice;