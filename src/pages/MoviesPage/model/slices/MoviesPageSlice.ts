import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MoviesPageSchema } from '../types/MoviesPageSchema';

const initialState: MoviesPageSchema = {
    
};

export const MoviesPageSlice = createSlice({
    name: 'MoviesPage',
    initialState,
    reducers: {
        template: (state, action: PayloadAction<string>) => {
           
        },
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(, (state) => {
    //             state.error = undefined;
    //             state.isLoading = true;
    //         })
    //         .addCase(, (state) => {
    //             state.isLoading = false;
    //         })
    //         .addCase(, (state, action) => {
    //             state.isLoading = false;
    //             state.error = action.payload;
    //         });
    // },
});

export const { actions: MoviesPageActions } = MoviesPageSlice;
export const { reducer: MoviesPageReducer } = MoviesPageSlice;