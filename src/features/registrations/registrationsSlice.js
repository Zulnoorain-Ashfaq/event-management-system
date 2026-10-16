import { createSlice } from "@reduxjs/toolkit";

const savedRegistrations =
  JSON.parse(localStorage.getItem("registrations")) || [];

const registrationsSlice = createSlice({
  name: "registrations",
  initialState: {
    items: savedRegistrations,
  },
  reducers: {
    addRegistration(state, action) {
      state.items.push(action.payload);
      localStorage.setItem("registrations", JSON.stringify(state.items));
    },
    removeRegistration(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
      localStorage.setItem("registrations", JSON.stringify(state.items));
    },
  },
});

export const { addRegistration, removeRegistration } =
  registrationsSlice.actions;
export default registrationsSlice.reducer;
