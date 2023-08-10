import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "app/providers/StoreProvider";
import i18n from "shared/config/i18n/i18n";
import {Article} from "entities/Article";
import {getArticlesPageLimit} from "pages/ArticlesPage/model/selectors/articlePageSelectors";


interface FetchArticlesListProps {
    page: number
}

export const fetchArticlesList =
    createAsyncThunk<
        Article[],
        FetchArticlesListProps,
        ThunkConfig<string>
    >(
        'article/fetchArticlesList',
        async (props, thunkAPI) => {
            const {extra, rejectWithValue, getState} = thunkAPI
            const {page = 1} = props
            const limit = getArticlesPageLimit(getState())

            try {
                const response = await extra.api.get<Article[]>(`/articles/`, {
                    params: {
                        _expand: 'user',
                        _limit: limit,
                        _page: page
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