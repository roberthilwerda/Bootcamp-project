import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loginData: {
      accessToken: localStorage.getItem("accessToken"),
      data_access_expiration_time: 0,
      email: null,
      expiresIn: 0,
      id: null,
      name: null,
      picture: null,
      signedRequest: null,
      userID: localStorage.getItem("accessToken"),
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
