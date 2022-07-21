import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loginData: {
      accessToken: localStorage.getItem("accessToken"),
      email: null,
      expiresIn: 0,
      name: null,
      picture: null,
      userID: localStorage.getItem("userID"),
    },
  },

  reducers: {
    setCredentials(state, action) {
      state.loginData = action.payload;
    },
    unsetCredentials(state) {
      state.loginData = {
        accessToken: null,
        data_access_expiration_time: 0,
        email: null,
        expiresIn: 0,
        id: null,
        name: null,
        picture: null,
        signedRequest: null,
        userID: null,
      }
    }
  },
});

export const authActions = authSlice.actions;
export default authSlice;
