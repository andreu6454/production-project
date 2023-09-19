import {useSelector} from "react-redux";
import {
    getArticlesPageOrder,
    getArticlesPageSearch,
    getArticlesPageSort,
    getArticlesPageType,
    getArticlesPageView
} from "../../model/selectors/articlePageSelectors";
import {useCallback} from "react";
import {ArticleSortField, ArticleType, ArticleView} from "@/entities/Article";
import {articlePageActions} from "../../model/slices/articlePageSlice";
import {SortOrder} from "@/shared/types";
import {useAppDispatch} from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import {fetchArticlesList} from "../../model/services/fetchArticlesList/fetchArticlesList";
import {useDebounce} from "@/shared/lib/hooks/useDebounce/useDebounce";

export function useArticleFilters() {
    const view = useSelector(getArticlesPageView)
    const sort = useSelector(getArticlesPageSort)
    const order = useSelector(getArticlesPageOrder)
    const search = useSelector(getArticlesPageSearch)
    const type = useSelector(getArticlesPageType)

    const dispatch = useAppDispatch()

    const fetchData = useCallback(() => {
        dispatch(fetchArticlesList({replace: true}))
    }, [dispatch])

    const debouncedFetchData = useDebounce(fetchData, 500)


    const onChangeView = useCallback((view: ArticleView) => {
        dispatch(articlePageActions.setView(view))
        dispatch(articlePageActions.setPage(1))
        fetchData()
    }, [dispatch, fetchData])

    const onChangeSort = useCallback((sort: ArticleSortField) => {
        dispatch(articlePageActions.setSort(sort))
        dispatch(articlePageActions.setPage(1))
        fetchData()
    }, [dispatch, fetchData])

    const onChangeOrder = useCallback((order: SortOrder) => {
        dispatch(articlePageActions.setOrder(order))
        dispatch(articlePageActions.setPage(1))
        fetchData()
    }, [dispatch, fetchData])

    const onChangeSearch = useCallback((search: string) => {
        dispatch(articlePageActions.setSearch(search))
        dispatch(articlePageActions.setPage(1))
        debouncedFetchData()
    }, [dispatch, debouncedFetchData])

    const onChangeType = useCallback((value: ArticleType) => {
        dispatch(articlePageActions.setType(value))
        dispatch(articlePageActions.setPage(1))
        fetchData()
    }, [dispatch, fetchData])


    return {
        view,
        sort,
        order,
        search,
        type,
        onChangeView,
        onChangeSort,
        onChangeOrder,
        onChangeSearch,
        onChangeType
    }
}