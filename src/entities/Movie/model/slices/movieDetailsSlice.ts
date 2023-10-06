import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {fetchMovieById} from "@/entities/Movie/model/services/fetchMovieById/fetchMovieById";
import {MovieDetailsSchema} from "@/entities/Movie";
import {MovieDtoV13} from "@openmoviedb/kinopoiskdev_client";

const initialState: MovieDetailsSchema = {
    isLoading: false,
    error: '',
    data: {} as MovieDtoV13,
    isInited: false
};

export const MovieDetailsSlice = createSlice({
    name: 'MovieDetailsSlice',
    initialState,
    reducers: {
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovieById.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchMovieById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
                state.isInited = true;
            })
            .addCase(fetchMovieById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const {actions: MovieDetailsActions} = MovieDetailsSlice;
export const {reducer: MovieDetailsReducer} = MovieDetailsSlice;