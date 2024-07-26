import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./hooks/AuthSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
