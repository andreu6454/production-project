import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "@/app/providers/StoreProvider";
import {
    getArticlesPageHasMore,
    getArticlesPageIsLoading,
    getArticlesPageNum
} from "../../selectors/articlePageSelectors";
import {fetchArticlesList} from "../fetchArticlesList/fetchArticlesList";
import {articlePageActions} from "../../slices/articlePageSlice";


export const fetchNextArticlesPage =
    createAsyncThunk<
        void,
        void,
        ThunkConfig<string>
    >(
        'article/fetchNextArticlesPage',
        async (_, thunkAPI) => {
            const {
                dispatch,
                getState
            } = thunkAPI

            const hasMore = getArticlesPageHasMore(getState())
            const page = getArticlesPageNum(getState())
            const isLoading = getArticlesPageIsLoading(getState())

            if (hasMore && !isLoading) {
                dispatch(fetchArticlesList({replace: false}))
                dispatch(articlePageActions.setPage(page + 1))
            }
        }
    )