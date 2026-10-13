import { createSlice } from "@reduxjs/toolkit";

const savedUser = JSON.parse(localStorage.getItem("user")) || null;

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: savedUser,
  },
  reducers: {
    register(state, action) {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      users.push(action.payload);
      localStorage.setItem("users", JSON.stringify(users));
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    login(state, action) {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout(state) {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

export const { register, login, logout } = authSlice.actions;
export default authSlice.reducer;
