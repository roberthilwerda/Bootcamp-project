import { createSlice } from "@reduxjs/toolkit";

const genreSlice = createSlice({
  name: "genre",
  initialState: {
    data: [],
    selectedGenre: "",
    selectedStartYear: 2021,
    selectedEndYear: 2021,
  },
  reducers: {
    setData(state, action) {
      state.data = action.payload;
    },
    changeSelectedGenre(state, action) {
      state.selectedGenre = action.payload;
    },
    changeSelectedStartYear(state, action) {
      state.selectedStartYear = action.payload;
    },
    changeSelectedEndYear(state, action) {
      state.selectedEndYear = action.payload;
    }
  },
});



export const genreActions = genreSlice.actions;
export default genreSlice;
