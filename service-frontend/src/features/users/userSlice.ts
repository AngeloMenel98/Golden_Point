import { createAppSlice } from "../../app/createAppSlice";
import { PayloadAction } from "@reduxjs/toolkit/react";

interface UserState {
  token: string | null;
}

const initialState: UserState = {
  token: null,
};

export const userSlice = createAppSlice({
  name: "users",
  initialState,
  reducers: {
    setUserToken(state, action: PayloadAction<string>) {
      state.token = action.payload;

      localStorage.setItem("token", state.token);
    },
    clearUserToken(state) {
      state.token = null;
    },
  },
});

export const { setUserToken, clearUserToken } = userSlice.actions;
