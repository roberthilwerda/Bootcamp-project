import { configureStore } from '@reduxjs/toolkit';
import genreSlice from './genre-slice';
import uiSlice from './ui-slice'

const store = configureStore({
    reducer: {
        genre: genreSlice.reducer,
        ui: uiSlice.reducer,
    },
})

export default store;