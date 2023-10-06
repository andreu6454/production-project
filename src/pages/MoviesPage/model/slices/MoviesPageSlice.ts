import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {MoviesPageSchema} from '../types/MoviesPageSchema';
import {fetchMoviesList} from "@/pages/MoviesPage/model/services/fetchMoviesList";

const initialState: MoviesPageSchema = {
    isLoading: false,
    page: 1,
    isInited: false
};

export const MoviesPageSlice = createSlice({
    name: 'MoviesPageSlice',
    initialState,
    reducers: {
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload
        },
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
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
                state.isInited = true;
            })
            .addCase(fetchMoviesList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    },
});

export const {actions: MoviesPageActions} = MoviesPageSlice;
export const {reducer: MoviesPageReducer} = MoviesPageSlice;