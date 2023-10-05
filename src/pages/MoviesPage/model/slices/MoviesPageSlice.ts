import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {MoviesPageSchema} from '../types/MoviesPageSchema';
import {fetchMoviesList} from "@/pages/MoviesPage/model/services/fetchMoviesList";
import {fetchMoviesByFilter} from "@/pages/MoviesPage/model/services/fetchMoviesByFilter";

const initialState: MoviesPageSchema = {
    isLoading: false,
    page: 1,
};

export const MoviesPageSlice = createSlice({
    name: 'MoviesPageSlice',
    initialState,
    reducers: {
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload
        },
        setYear: (state, action: PayloadAction<string>) => {
            state.year = action.payload
        },
        setCountry: (state, action: PayloadAction<string>) => {
            state.country = action.payload
        },
        setGenre: (state, action: PayloadAction<string>) => {
            state.genre = action.payload
        },
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
            })
            .addCase(fetchMoviesByFilter.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(fetchMoviesByFilter.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchMoviesByFilter.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const {actions: MoviesPageActions} = MoviesPageSlice;
export const {reducer: MoviesPageReducer} = MoviesPageSlice;