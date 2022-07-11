import { createSlice } from "@reduxjs/toolkit";

const genreSlice = createSlice({
  name: "genre",
  initialState: {
    allData: [],
    selectedGenre: "",
    selectedStartYear: 2021,
    selectedEndYear: 2021,
  },
  reducers: {
    replaceAllData(state, action) {
      state.allData = action.payload.allData;
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
