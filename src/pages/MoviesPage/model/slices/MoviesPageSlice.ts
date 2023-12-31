import {createEntityAdapter, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {MoviesPageSchema} from '../types/MoviesPageSchema';
import {fetchMoviesList} from "@/pages/MoviesPage/model/services/fetchMoviesList";
import {MovieDtoV13} from "@openmoviedb/kinopoiskdev_client";
import {StateSchema} from "@/app/providers/StoreProvider";


const moviesAdapter = createEntityAdapter<MovieDtoV13>({
    selectId: movie => movie.id
})

export const getMovies = moviesAdapter.getSelectors<StateSchema>(
    (state) => state.moviesPage || moviesAdapter.getInitialState()
)
const initialState: MoviesPageSchema = {
    isLoading: false,
    page: 1,
    isInited: false,
    sort: '',
    hasMore: false,
    ids: [],
    entities: {}
};

export const MoviesPageSlice = createSlice({
    name: 'MoviesPageSlice',
    initialState: moviesAdapter.getInitialState(initialState),
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
        setSort: (state, action: PayloadAction<string>) => {
            state.sort = action.payload
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMoviesList.pending, (state, action) => {
                state.isLoading = true;
                state.error = undefined;
                if (action.meta.arg.replace) {
                    moviesAdapter.removeAll(state);
                }
            })
            .addCase(fetchMoviesList.fulfilled, (state, action) => {
                if (action.meta.arg.replace) {
                    moviesAdapter.setAll(state, action.payload.docs)
                } else {
                    moviesAdapter.addMany(state, action.payload.docs)
                }
                state.hasMore = action.payload.pages > 1;
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