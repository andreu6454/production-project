import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {fetchMovieById} from "@/entities/Movie/model/services/fetchMovieById/fetchMovieById";
import {MovieDetailsSchema} from "@/entities/Movie";
import {MovieDtoV13} from "@openmoviedb/kinopoiskdev_client";

const initialState: MovieDetailsSchema = {
    isLoading: false,
    error: '',
    data: {} as MovieDtoV13
};

export const MovieDetailsSlice = createSlice({
    name: 'Movie',
    initialState,
    reducers: {
        template: (state, action: PayloadAction<string>) => {

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
                state.data = action.payload
            })
            .addCase(fetchMovieById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const {actions: MovieDetailsActions} = MovieDetailsSlice;
export const {reducer: MovieDetailsReducer} = MovieDetailsSlice;