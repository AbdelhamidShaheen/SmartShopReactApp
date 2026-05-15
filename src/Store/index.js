import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice";
let store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
