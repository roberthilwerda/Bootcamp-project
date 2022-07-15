import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loginData: {
      accessToken: "",
      data_access_expiration_time: 0,
      email: "",
      expiresIn: 0,
      id: "",
      name: "",
      picture: "",
      signedRequest: "",
      userID: "",
    },
  },

  reducers: {
    setCredentials(state, action) {
      console.log(action.payload);
      state.loginData = action.payload;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
