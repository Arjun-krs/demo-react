import { configureStore } from "@reduxjs/toolkit";
import vehicleReducer from "./Slice/vehicleSlice";

const store = configureStore({
  reducer: {
    vehicle: vehicleReducer,
  },
});

export default store;
