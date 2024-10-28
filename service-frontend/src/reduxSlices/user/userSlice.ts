import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserData } from "../../utils/interfaces";

interface UserState {
  user: UserData | null;
}

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logInUser: (state, action: PayloadAction<UserData>) => {
      state.user = action.payload;
    },
    logOutUser: (state) => {
      state.user = null;
    },
  },
});

export const { logInUser, logOutUser } = userSlice.actions;

export default userSlice.reducer;
