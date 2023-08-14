import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "app/providers/StoreProvider";
import {getArticlesPageInited} from "pages/ArticlesPage/model/selectors/articlePageSelectors";
import {fetchArticlesList} from "pages/ArticlesPage/model/services/fetchArticlesList/fetchArticlesList";
import {articlePageActions} from "pages/ArticlesPage/model/slices/articlePageSlice";
import {ArticleSortField} from "entities/Article/model/types/article";
import {SortOrder} from "shared/types";


export const initArticlesPage =
    createAsyncThunk<
        void,
        URLSearchParams,
        ThunkConfig<string>
    >(
        'article/initArticlesPage',
        async (searchParams, thunkAPI) => {
            const {
                dispatch,
                getState
            } = thunkAPI

            const inited = getArticlesPageInited(getState())

            if (!inited) {
                const orderFromUrl = searchParams.get('order') as SortOrder
                const sortFromUrl = searchParams.get('sort') as ArticleSortField
                const searchFromUrl = searchParams.get('search') ?? ''


                orderFromUrl && dispatch(articlePageActions.setOrder(orderFromUrl))

                sortFromUrl && dispatch(articlePageActions.setSort(sortFromUrl))

                orderFromUrl && dispatch(articlePageActions.setSearch(searchFromUrl))

                dispatch(articlePageActions.initState())
                dispatch(fetchArticlesList({replace: false}))
            }
        }
    )