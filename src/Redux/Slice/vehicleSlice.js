import { createSlice } from "@reduxjs/toolkit";
import { vehicleList } from "../Action";

const initialState = {
  vehicles: [],
  loading: false,
  error: null,
};

const vehicleSlice = createSlice({
  name: "vehicle",
  initialState,
  reducers: {
    clearVehicles: (state) => {
      state.vehicles = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(vehicleList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(vehicleList.fulfilled, (state, action) => {
        state.loading = false;
        state.vehicles = action.payload?.data || [];
      })
      .addCase(vehicleList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { clearVehicles } = vehicleSlice.actions;
export default vehicleSlice.reducer;
