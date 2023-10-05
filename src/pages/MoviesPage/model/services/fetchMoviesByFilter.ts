import {createAsyncThunk} from "@reduxjs/toolkit";
import {KinopoiskDev, MovieDocsResponseDtoV13} from "@openmoviedb/kinopoiskdev_client";
import {ThunkConfig} from "@/app/providers/StoreProvider";
import {kpToken} from "@/shared/const/kinopoisk";
import i18n from "@/shared/config/i18n/i18n";

export const fetchMoviesByFilter =
    createAsyncThunk<MovieDocsResponseDtoV13, void, ThunkConfig<string>>(
        'movies/fetchMoviesByFilter',
        async (_, thunkAPI
        ) => {
            const {rejectWithValue} = thunkAPI

            try {
                const kp = new KinopoiskDev(kpToken)

                const {data} = await kp.movie.getByFilters({})

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