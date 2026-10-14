import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchEvents, fetchEventById } from "../../api/ticketmaster";

export const getEvents = createAsyncThunk("events/getEvents", (filters) => {
  return fetchEvents(filters);
});

export const getEventDetails = createAsyncThunk(
  "events/getEventDetails",
  (id) => {
    return fetchEventById(id);
  }
);

const eventsSlice = createSlice({
  name: "events",
  initialState: {
    list: [],
    event: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(getEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getEventDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.event = null;
      })
      .addCase(getEventDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.event = action.payload;
      })
      .addCase(getEventDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default eventsSlice.reducer;
