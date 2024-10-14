import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../../entities/User";

interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logInUser: (state, action: PayloadAction<User>) => {
      console.log(action.payload);
      state.user = action.payload;
    },
    logOutUser: (state) => {
      state.user = null;
    },
  },
});

export const { logInUser, logOutUser } = userSlice.actions;

export default userSlice.reducer;
