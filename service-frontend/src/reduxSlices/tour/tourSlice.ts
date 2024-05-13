import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TourDTO } from "../../entities/dtos/TourDTO";

interface TourState {
  tour: TourDTO | null;
}

const initialState: TourState = {
  tour: null,
};

const tourSlice = createSlice({
  name: "tour",
  initialState,
  reducers: {
    setTour: (state, action: PayloadAction<TourDTO>) => {
      state.tour = action.payload;
    },
  },
});

export const { setTour } = tourSlice.actions;

export default tourSlice.reducer;
