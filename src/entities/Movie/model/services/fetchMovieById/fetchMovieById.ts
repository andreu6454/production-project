import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "@/app/providers/StoreProvider";
import i18n from "@/shared/config/i18n/i18n";
import {KinopoiskDev, MovieDtoV13} from "@openmoviedb/kinopoiskdev_client";
import {kpToken} from "@/shared/const/kinopoisk";

export const fetchMovieById =
    createAsyncThunk<MovieDtoV13, number, ThunkConfig<string>>(
        'movies/fetchMovieById',
        async (id, thunkAPI
        ) => {

            const {rejectWithValue} = thunkAPI
            try {
                const kp = new KinopoiskDev(kpToken)

                const {data} = await kp.movie.getById(id)

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
