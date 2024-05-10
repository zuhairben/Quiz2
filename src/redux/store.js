import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./reducers/userReducer";

const rootReducer = combineReducers({ user: userSlice.reducer });

const store = configureStore({
  reducer: rootReducer,
});

export default store;
