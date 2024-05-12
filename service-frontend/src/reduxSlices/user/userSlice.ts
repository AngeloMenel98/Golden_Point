import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../../entities/User";

interface UserState {
  user: User;
}

const initialState: UserState = {
  user: new User(),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logInUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    logOutUser: (state) => {
      state.user = new User();
    },
  },
});

export const { logInUser, logOutUser } = userSlice.actions;

export default userSlice.reducer;
