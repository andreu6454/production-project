import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { ArticleSortField, ArticleType } from '@/entities/Article';
import {fetchArticlesList} from "@/pages/ArticlesPage/model/services/fetchArticlesList/fetchArticlesList";
import {getArticlesPageInited} from "../../selectors/articlePageSelectors";
import {SortOrder} from "@/shared/types";
import {articlePageActions} from "@/pages/ArticlesPage/model/slices/articlePageSlice";

export const initArticlesPage = createAsyncThunk<
    void,
    URLSearchParams,
    ThunkConfig<string>
>('articlesPage/initArticlesPage', async (searchParams, thunkApi) => {
    const { getState, dispatch } = thunkApi;
    const inited = getArticlesPageInited(getState());

    if (!inited) {
        const orderFromUrl = searchParams.get('order') as SortOrder;
        const sortFromUrl = searchParams.get('sort') as ArticleSortField;
        const searchFromUrl = searchParams.get('search');
        const typeFromUrl = searchParams.get('type') as ArticleType;

        if (orderFromUrl) {
            dispatch(articlePageActions.setOrder(orderFromUrl));
        }
        if (sortFromUrl) {
            dispatch(articlePageActions.setSort(sortFromUrl));
        }
        if (searchFromUrl) {
            dispatch(articlePageActions.setSearch(searchFromUrl));
        }
        if (typeFromUrl) {
            dispatch(articlePageActions.setType(typeFromUrl));
        }

        dispatch(articlePageActions.initState());
        dispatch(fetchArticlesList({}));
    }
});
