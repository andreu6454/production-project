import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "@/app/providers/StoreProvider";
import {getMoviesPageIsLoading, getMoviesPagePageNum} from "@/pages/MoviesPage/model/selectors/moviesPageSelectors";
import {fetchMoviesList} from "@/pages/MoviesPage/model/services/fetchMoviesList";
import {MoviesPageActions} from "@/pages/MoviesPage/model/slices/MoviesPageSlice";

export const fetchNextMoviesPage =
    createAsyncThunk<
        void,
        void,
        ThunkConfig<string>
    >(
        'movies/fetchNextMoviesPage',
        async (_, thunkAPI) => {
            const {
                dispatch,
                getState
            } = thunkAPI

            const page = getMoviesPagePageNum(getState())
            const isLoading = getMoviesPageIsLoading(getState())

            if (!isLoading) {
                dispatch(fetchMoviesList({replace: false}))
                dispatch(MoviesPageActions.setPage(page + 1))
            }
        }
    )