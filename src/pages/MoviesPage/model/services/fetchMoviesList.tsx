import {createAsyncThunk} from "@reduxjs/toolkit";
import {KinopoiskDev, MovieDocsResponseDtoV13} from "@openmoviedb/kinopoiskdev_client";
import {ThunkConfig} from "@/app/providers/StoreProvider";
import {kpToken} from "@/shared/const/kinopoisk";
import i18n from "@/shared/config/i18n/i18n";
import {
    getMoviesPageCountry,
    getMoviesPageGenre,
    getMoviesPageSearch,
    getMoviesPageYear
} from "@/pages/MoviesPage/model/selectors/moviesPageSelectors";

export const fetchMoviesList =
    createAsyncThunk<MovieDocsResponseDtoV13, void, ThunkConfig<string>>(
        'movies/fetchMoviesList',
        async (_, thunkAPI
        ) => {
            const {rejectWithValue, getState} = thunkAPI

            const genre = getMoviesPageGenre(getState())
            const country = getMoviesPageCountry(getState())
            const year = getMoviesPageYear(getState())
            const search = getMoviesPageSearch(getState())

            console.log(genre, country, year, search)
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

                const {data} = await kp.movie.getByFilters(filters)


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