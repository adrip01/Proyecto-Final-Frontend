import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,

  userInfo: {
    id: null,
    user_name: null,
    role: null,
  },

  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setUserInfo: (state, action) => {
      state.userInfo = { ...state.userInfo, ...action.payload };
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { setIsLoggedIn, setUserInfo, setToken } = authSlice.actions;
export default authSlice.reducer;
