import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "app/providers/StoreProvider";
import i18n from "shared/config/i18n/i18n";
import {Article} from "entities/Article";

export const fetchArticleById =
    createAsyncThunk<Article, string, ThunkConfig<string>>(
        'article/fetchArticleById',
        async (articleId, thunkAPI
        ) => {

            const {extra, rejectWithValue} = thunkAPI
            try {
                const response = await extra.api.get<Article>(`/articles/${articleId}`, {
                    params: {
                        _expand: 'user'
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
