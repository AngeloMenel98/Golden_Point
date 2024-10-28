import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TourData } from "../../utils/interfaces";

interface TourState {
  tour: TourData | null;
}

const initialState: TourState = {
  tour: null,
};

const tourSlice = createSlice({
  name: "tour",
  initialState,
  reducers: {
    setTour: (state, action: PayloadAction<TourData>) => {
      state.tour = action.payload;
    },
  },
});

export const { setTour } = tourSlice.actions;

export default tourSlice.reducer;
