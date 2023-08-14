import {createAsyncThunk} from "@reduxjs/toolkit";
import {Article} from "entities/Article";
import {ThunkConfig} from "app/providers/StoreProvider";
import i18n from "shared/config/i18n/i18n";

export const fetchArticleRecommendations =
    createAsyncThunk<
        Article[],
        void,
        ThunkConfig<string>
    >(
        'articleDetails/fetchArticleRecommendations',
        async (_, thunkAPI) => {
            const {extra, rejectWithValue, getState} = thunkAPI

            try {

                const response = await extra.api.get<Article[]>(`/articles/`, {
                    params: {
                        _limit: 4,
                    }
                })

                if (!response.data) {
                    throw new Error()
                }

                return response.data
            } catch (e) {
                console.log(e)
                return rejectWithValue(i18n.t('error'))
            }
        }
    )