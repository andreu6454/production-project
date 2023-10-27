import {createAsyncThunk} from "@reduxjs/toolkit";
import {KinopoiskDev, MovieDocsResponseDtoV13} from "@openmoviedb/kinopoiskdev_client";
import {ThunkConfig} from "@/app/providers/StoreProvider";
import {kpToken} from "@/shared/const/kinopoisk";
import i18n from "@/shared/config/i18n/i18n";
import {
    getMoviesPageCountry,
    getMoviesPageGenre, getMoviesPagePageNum,
    getMoviesPageSearch, getMoviesPageSort,
    getMoviesPageYear
} from "../selectors/moviesPageSelectors";

type FetchMoviesListProps = {
    replace?: boolean
}

export const fetchMoviesList =
    createAsyncThunk<MovieDocsResponseDtoV13, FetchMoviesListProps, ThunkConfig<string>>(
        'movies/fetchMoviesList',
        async (props, thunkAPI
        ) => {
            const {rejectWithValue, getState} = thunkAPI

            const genre = getMoviesPageGenre(getState())
            const country = getMoviesPageCountry(getState())
            const year = getMoviesPageYear(getState())
            const search = getMoviesPageSearch(getState())
            const sort = getMoviesPageSort(getState())
            const page = getMoviesPagePageNum(getState())

            try {
                const kp = new KinopoiskDev(kpToken)

                let filters = {}

                if (genre) {
                    filters = {...filters, "genres.name": genre}
                }
                if (country) {
                    filters = {...filters, "countries.name": country}
                }
                if (year) {
                    filters = {...filters, year: year}
                }
                if (search) {
                    filters = {...filters, name: search}
                }
                if (sort) {
                    filters = {...filters, sortField: sort}
                }

                const {data} = await kp.movie.getByFilters({...filters, page: page})

                if (!data) {
                    throw new Error()
                }
                return data
            } catch (e) {
                console.log(e)
                return rejectWithValue(i18n.t('error'))
            }

        }
    )