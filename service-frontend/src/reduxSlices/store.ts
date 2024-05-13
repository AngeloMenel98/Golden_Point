import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import tourReducer from "./tour/tourSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    tour: tourReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
