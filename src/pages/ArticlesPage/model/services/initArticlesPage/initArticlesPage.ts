import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "app/providers/StoreProvider";
import {getArticlesPageInited} from "pages/ArticlesPage/model/selectors/articlePageSelectors";
import {fetchArticlesList} from "pages/ArticlesPage/model/services/fetchArticlesList/fetchArticlesList";
import {articlePageActions} from "pages/ArticlesPage/model/slices/articlePageSlice";

export const initArticlesPage =
    createAsyncThunk<
        void,
        void,
        ThunkConfig<string>
    >(
        'article/initArticlesPage',
        async (_, thunkAPI) => {
            const {
                dispatch,
                getState
            } = thunkAPI

            const inited = getArticlesPageInited(getState())

            if (!inited) {
                dispatch(articlePageActions.initState())
                dispatch(fetchArticlesList({
                    page: 1
                }))
            }
        }
    )