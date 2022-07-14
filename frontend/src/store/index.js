import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth-slice';
import genreSlice from './genre-slice';
import uiSlice from './ui-slice'

const store = configureStore({
    reducer: {
        genre: genreSlice.reducer,
        ui: uiSlice.reducer,
        auth: authSlice.reducer,
    },
})

export default store;