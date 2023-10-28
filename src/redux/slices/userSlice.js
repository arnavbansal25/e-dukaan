import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    info: {},
  },

  reducers: {
    setCurrUser: (state, action) => {
      console.log("ggg", action)
      state.isLoggedIn = true;
      Object.assign(state.info, { ...state.info, ...action.payload });
    },
  },
});

export const { setCurrUser } = cartSlice.actions;

export default cartSlice.reducer; // reducer WITHOUT an (s)
