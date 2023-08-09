import {createAsyncThunk} from "@reduxjs/toolkit";
import {getUserAuthData} from "entities/User";
import {ThunkConfig} from "app/providers/StoreProvider";
import i18n from "shared/config/i18n/i18n";
import {fetchCommentsByArticleId} from "../fetchCommentsByArticleId/fetchCommentsByArticleId";
import {getArticleDetailsData} from "entities/Article";

export const addCommentForArticle =
    createAsyncThunk<Comment, string, ThunkConfig<string>>(
        'addCommentForm/SendComment',
        async (text, thunkAPI
        ) => {
            const {
                extra,
                dispatch,
                rejectWithValue,
                getState
            } = thunkAPI

            const userData = getUserAuthData(getState())
            const article = getArticleDetailsData(getState())

            if (!userData || !text || !article) {
                return rejectWithValue('no data')
            }
            try {
                const response = await extra.api.post<Comment>('/comments', {
                    articleId: article.id,
                    userId: userData.id,
                    text
                })
                if (!response.data) {
                    throw new Error()
                }

                dispatch(fetchCommentsByArticleId(article.id))

                return response.data
            } catch (e) {
                console.log(e)
                return rejectWithValue(i18n.t('error'))
            }
        }
    )