import {createSlice} from '@reduxjs/toolkit';
import {MoviesPageSchema} from '../types/MoviesPageSchema';
import {fetchMoviesList} from "@/pages/MoviesPage/model/services/fetchMoviesList";

const initialState: MoviesPageSchema = {
    isLoading: false
};

export const MoviesPageSlice = createSlice({
    name: 'MoviesPageSlice',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMoviesList.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(fetchMoviesList.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchMoviesList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: MoviesPageActions } = MoviesPageSlice;
export const { reducer: MoviesPageReducer } = MoviesPageSlice;